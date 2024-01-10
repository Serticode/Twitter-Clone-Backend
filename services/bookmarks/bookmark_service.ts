import BookmarksModel from "../../database/models/bookmarks/bookmarks";
import PostModel, { PostDocument } from "../../database/models/posts/posts";
import { User } from "../../services/models/auth_models";
import {
  AddToBookmarkResult,
  GetBookmarksResult,
  UerBookmarksDeleteParams,
  UserBookmarksCreationParams,
} from "../../services/models/bookmark_models";
import { DeleteBookmarkResult } from "../models/bookmark_models";

//!
//!
export default class BookmarksService {
  //!
  //! GET POST BY ID
  public async addToBookmarks(
    params: UserBookmarksCreationParams
  ): Promise<AddToBookmarkResult | string> {
    try {
      const userID = params.userID;
      const postID = params.postToBookmark.postID;

      const post = await PostModel.findById(postID);

      if (!post) {
        return "Post not found";
      }

      let bookmarks = await BookmarksModel.findOne({ userID });

      if (!bookmarks) {
        bookmarks = new BookmarksModel({
          userID,
          posts: [post],
        });
      } else {
        if (!Array.isArray(bookmarks.posts)) {
          bookmarks.posts = [];
        }

        const postExists = bookmarks.posts.some(
          (bookmarkPost: any) => bookmarkPost._id.toString() === postID
        );

        if (!postExists) {
          bookmarks.posts.push(post);
        } else {
          return "Post already bookmarked";
        }
      }

      const savedBookmarks = await bookmarks.save();

      const user = { userID: savedBookmarks.userID } as unknown as User;
      const userBookmarks = savedBookmarks.posts as PostDocument[];

      return { user, bookmarks: userBookmarks };
    } catch (error) {
      console.error("Error adding to bookmarks:", error);
      return "Could not add to bookmark";
    }
  }

  //!
  //! GET USER BOOKMARKS
  public async getBookmarksByUserID(
    userID: string
  ): Promise<GetBookmarksResult | string> {
    try {
      const result = (await BookmarksModel.findOne({
        userID,
      })) as unknown as GetBookmarksResult;

      return result;
    } catch (error) {
      console.error("Error getting bookmarks:", error);
      return "Could not fetch bookmarks";
    }
  }

  //!
  //! DELETE USER BOOKMARK
  async deletePostFromBookmarks(
    params: UerBookmarksDeleteParams
  ): Promise<DeleteBookmarkResult> {
    try {
      const { userID, postToDelete } = params;
      const { postID } = postToDelete;

      const userBookmarks = await BookmarksModel.findOne({ userID });

      if (!userBookmarks || !Array.isArray(userBookmarks.posts)) {
        return "Post has already been deleted or user's bookmarks not found" as unknown as DeleteBookmarkResult;
      }

      const foundPost = userBookmarks.posts.find(
        (post: PostDocument) => post._id?.toString() === postID
      );

      if (!foundPost) {
        return "Cannot find post in your bookmarks" as unknown as DeleteBookmarkResult;
      }

      userBookmarks.posts.splice(userBookmarks.posts.indexOf(foundPost), 1); // Remove the found post from the array

      userBookmarks.markModified("posts");
      await userBookmarks.save();

      return "Post deleted successfully from user's bookmarks" as unknown as DeleteBookmarkResult;
    } catch (error) {
      console.error("Error deleting post from bookmarks:", error);
      return "Failed to delete post from user's bookmarks" as unknown as DeleteBookmarkResult;
    }
  }
}
