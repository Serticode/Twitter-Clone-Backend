import BookmarksModel from "../../database/models/bookmarks/bookmarks";
import PostModel, { PostDocument } from "../../database/models/posts/posts";
import { User } from "../../services/models/auth_models";
import {
  AddToBookmarkResult,
  GetBookmarksResult,
  UserBookmarksCreationParams,
} from "../../services/models/bookmark_models";

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
        bookmarks.posts.push(post);
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
}
