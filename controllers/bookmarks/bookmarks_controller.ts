import { StatusCodes } from "http-status-codes";
import {
  Body,
  Controller,
  Get,
  OperationId,
  Path,
  Post,
  Response,
  Route,
  Security,
  Tags,
} from "tsoa";
import BookmarksService from "../../services/bookmarks/bookmark_service";
import {
  AddToBookmarkResult,
  GetBookmarksResult,
  UserBookmarksCreationParams,
} from "../../services/models/bookmark_models";

@Route("/api/v1/bookmarks")
@Tags("Bookmarks")
export class BookmarksController extends Controller {
  //!
  //!
  @Get("/getBookmarks/{userID}")
  @OperationId("getBookmarks")
  @Response(StatusCodes.OK)
  @Response(StatusCodes.UNAUTHORIZED, "Unauthorized")
  @Security("jwt")
  public async getBookmarks(
    @Path() userID: string
  ): Promise<GetBookmarksResult | string> {
    return await new BookmarksService().getBookmarksByUserID(userID);
  }

  //!
  //!
  @Post("/setBookmarks")
  @OperationId("setBookmark")
  @Security("jwt")
  @Response(StatusCodes.OK)
  @Response(StatusCodes.UNAUTHORIZED, "Unauthorized")
  @Response(
    StatusCodes.BAD_REQUEST,
    "Bad request. Kindly check your header and body params"
  )
  public async setBookmark(
    @Body() body: UserBookmarksCreationParams
  ): Promise<AddToBookmarkResult | string> {
    return await new BookmarksService().addToBookmarks(body);
  }
}
