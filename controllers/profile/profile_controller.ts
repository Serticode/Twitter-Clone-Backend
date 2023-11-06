import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { StatusCodes } from "http-status-codes";
import {
  Body,
  Controller,
  Delete,
  Get,
  OperationId,
  Path,
  Post,
  Request,
  Response,
  Route,
  Security,
  Tags,
} from "tsoa";
import { NoPhotoUploadedError } from "../../errors";
import { Profile } from "../../services/models/profile_model";
import ProfileService from "../../services/profile/profile_service";

@Route("/api/v1/profile")
@Tags("Profile")
export class ProfileController extends Controller {
  //!
  //! FETCH USER PROFILE DETAILS
  @Response(StatusCodes.OK)
  @Get("info/{userId}")
  @OperationId("getProfile")
  @Security("jwt")
  public async get(@Path() userId: string): Promise<Profile> {
    this.setStatus(StatusCodes.OK);
    return new ProfileService().get(userId);
  }

  //!
  //! SET / SAVE USER PROFILE DETAILS
  @Response(StatusCodes.OK)
  @Post("updateProfile")
  @OperationId("setProfile")
  @Security("jwt")
  public async setProfile(
    @Request() request: ExpressRequest,
    @Body() requestBody: Profile
  ): Promise<Profile> {
    this.setStatus(StatusCodes.OK);
    const user = request.user as { id: string };
    return new ProfileService().set(user.id, requestBody);
  }

  //!
  //! UPLOAD PROFILE PHOTO
  @Post("uploadPhoto")
  @OperationId("setProfilePhoto")
  @Security("jwt")
  @Response(StatusCodes.OK)
  @Response(StatusCodes.BAD_REQUEST, "No photo uploaded")
  @Response(StatusCodes.BAD_REQUEST, "Invalid mime type")
  public async setProfilePhoto(
    @Request() request: ExpressRequest
  ): Promise<void> {
    if (!request.files || Object.keys(request.files).length === 0) {
      throw new NoPhotoUploadedError();
    }
    this.setStatus(StatusCodes.OK);
    const user = request.user as { id: string };
    return new ProfileService().setPhoto(user.id, request as any);
  }

  //!
  //! GET PROFILE PHOTO
  @Response(StatusCodes.OK)
  @Response(StatusCodes.NOT_FOUND, "Photo not found")
  @Get("photo/{userId}")
  @OperationId("getProfilePhoto")
  @Security("jwt")
  public async getProfilePhoto(
    @Path() userId: string,
    @Request() request: ExpressRequest
  ): Promise<void> {
    const photoInfo = await new ProfileService().getPhoto(userId);
    const response = request.res as ExpressResponse;
    return new Promise<void>((resolve, reject) => {
      response.sendFile(photoInfo.photoName, photoInfo.options, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  //!
  //! DELETE PROFILE
  @Delete("deletePhoto")
  @Security("jwt")
  @OperationId("deleteProfilePhoto")
  @Response(StatusCodes.OK)
  @Response(StatusCodes.NOT_FOUND, "Photo not found")
  public async deleteProfilePhoto(
    @Request() request: ExpressRequest
  ): Promise<void> {
    const user = request.user as { id: string };
    this.setStatus(StatusCodes.OK);
    return new ProfileService().deletePhoto(user.id);
  }
}
