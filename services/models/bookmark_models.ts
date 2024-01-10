import { PostDocument } from "../../database/models/posts/posts";
import { User } from "../../services/models/auth_models";
import { PostForGetBookmarkResult } from "../../services/models/post_model";

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

export interface SearchBookmarkParams {
  userID: string;
  searchQuery: string;
}

export interface UserBookmarkQueryResult {
  result: PostDocument[];
}

export interface UserBookmarkQueryFailedResult {
  result: string;
}
