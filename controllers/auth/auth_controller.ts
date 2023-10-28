//!
//! THIS FILE IS BASICALLY THE ENDPOINTS THAT THE CLIENT CALLS
//! WE USE TSOA TO HELP US GENERATE THE END API DOCS
//!
//!
import { StatusCodes } from "http-status-codes";
import {
  Body,
  Controller,
  OperationId,
  Post,
  Route,
  Security,
  Tags,
} from "tsoa";
import AuthService from "../../services/auth/auth_service";
import {
  LoginParams,
  UserAndCredentials,
  UserCreationParams,
} from "../../services/models/auth_models";

//! ENFORCING THE ROUTE USING TSOA @ROUTE
@Route("/api/v1/auth")
//! ENFORCING A ROUTE TAG
@Tags("Auth")

//!
//! CONTROLLER STARTS HERE
export class AuthController extends Controller {
  //! STATING THAT THE METHOD BELOW IS A POST METHOD. IT CAN BE A GET, PUT OR DELETE
  @Post("register")
  //! ID FOR THE OPERATION
  @OperationId("registerUser")

  //!
  //! REGISTER USER
  public async register(
    //! STATING THAT THE PARAM SHOULD BE PASSED THROUGH THE BODY OF THE REQUEST
    @Body() requestBody: UserCreationParams
  ): //! PROMISES ARE BASICALLY FUTURES
  Promise<UserAndCredentials> {
    this.setStatus(StatusCodes.CREATED);
    return new AuthService().register(requestBody);
  }

  //!
  //! LOGIN USER
  @Post("login")
  @OperationId("loginUser")
  public async login(
    @Body() requestBody: LoginParams
  ): Promise<UserAndCredentials> {
    this.setStatus(StatusCodes.OK);
    return new AuthService().login(requestBody);
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
