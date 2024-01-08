import { Request as ExpressRequest } from "express";
import { StatusCodes } from "http-status-codes";
import {
  Body,
  Controller,
  Get,
  OperationId,
  Post,
  Request,
  Response,
  Route,
  Security,
  Tags,
} from "tsoa";
import { InterestDocument } from "../../database/models/interests/interests";
import AuthenticatedUser from "../../middleware/models/authenticated_user";
import TopicsService from "../../services/interests/interests_service";
import {
  UserAndInterests,
  UserInterestsCreationParams,
} from "../../services/models/interests_model";

@Route("/api/v1/interests")
@Tags("Interests")
export class InterestsController extends Controller {
  //!
  //!
  @Get("/getInterests")
  @OperationId("getInterests")
  @Response(StatusCodes.OK)
  @Response(StatusCodes.UNAUTHORIZED, "Unauthorized")
  @Security("jwt")
  public async getTopics(): Promise<InterestDocument[]> {
    console.log("GET TOPICS CALLED: ");
    return await new TopicsService().getInterests();
  }

  //!
  //!
  @Post("/setInterests")
  @OperationId("setInterests")
  @Security("jwt")
  @Response(StatusCodes.OK)
  @Response(StatusCodes.UNAUTHORIZED, "Unauthorized")
  @Response(StatusCodes.BAD_REQUEST, "Wrong params passed")
  public async setInterests(
    @Request() request: ExpressRequest,
    @Body() body: UserInterestsCreationParams
  ): Promise<UserAndInterests> {
    console.log("BODY: ", body);
    const user = request.user as AuthenticatedUser;
    return await new TopicsService().setUserInterests(user.id, body);
  }
}
