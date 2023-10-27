import { StatusCodes } from "http-status-codes";
import AuthService from "services/auth/auth_service";
import {
  UserAndCredentials,
  UserCreationParams,
} from "services/models/auth_models";
import {
  Body,
  Controller,
  OperationId,
  Post,
  Route,
  Security,
  Tags,
} from "tsoa";

//! ENFORCING THE ROUTE USING TSOA @ROUTE
@Route("/api/v1/auth")
//! ENFORCING A ROUTE TAG
@Tags("Auth")
export class AuthController extends Controller {
  //! STATING THAT THE METHOD BELOW IS A POST METHOD. IT CAN BE A GET, PUT OR DELETE
  @Post("register")
  //! ID FOR THE OPERATION
  @OperationId("registerUser")
  public async register(
    //! STATING THAT THE PARAM SHOULD BE PASSED THROUGH THE BODY OF THE REQUEST
    @Body() requestBody: UserCreationParams
  ): //! PROMISES ARE BASICALLY FUTURES
  Promise<UserAndCredentials> {
    this.setStatus(StatusCodes.CREATED);
    return new AuthService().register(requestBody);
  }

  // TODO: remove this dummy endpoint later when
  // we have proper endpoints that use our
  // authentication mechanism
  @Post("dummy")
  @OperationId("dummy")
  @Security("jwt")
  public async dummy(): Promise<void> {
    this.setStatus(StatusCodes.OK);
    return Promise.resolve();
  }
}
