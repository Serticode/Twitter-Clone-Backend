import { PostDocument } from "../../database/models/posts/posts";
import { User } from "./auth_models";
import { PostForGetBookmarkResult } from "./post_model";

export interface UserBookmarkToFetch {
  userID: string;
}

export interface UserPostToBookmark {
  postID: string;
}
export interface UserBookmarksCreationParams {
  userID: string;
  postToBookmark: UserPostToBookmark;
}

export interface UerBookmarksDeleteParams {
  userID: string;
  postToDelete: UserPostToBookmark;
}

export interface AddToBookmarkResult {
  user: User;
  bookmarks: PostDocument[];
}

export interface GetBookmarksResult {
  bookmarks: PostForGetBookmarkResult[];
}

export interface DeleteBookmarkResult {
  result: string;
}
