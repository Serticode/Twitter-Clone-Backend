//!
//!THIS IS SIMPLY THE REPOSITORY THAT DOES THE MAIN FUNCTIONS.
//! ALL FUNCTIONS IN HERE ARE CALLED BY THE CONTROLLERS
//!

import { v4 as uuidv4 } from "uuid";
import User from "../../database/models/user/user_model";
import {
  LoginParams,
  UserAndCredentials,
  UserCreationParams,
} from "../models/auth_models";

import { UnauthorizedError } from "../../errors";

export default class AuthService {
  //!
  //! REGISTER USER
  public async register(
    params: UserCreationParams
  ): Promise<UserAndCredentials> {
    const user = await User.create(params);
    const uuid = uuidv4();
    const token = user.createJWT(uuid);
    const refresh = user.createRefresh(uuid);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token,
      refresh,
    };
  }

  //!
  //! LOGIN
  public async login(params: LoginParams): Promise<UserAndCredentials> {
    const user = await User.findOne({ email: params.email });
    if (!user) {
      throw new UnauthorizedError();
    }
    const isCorrectPassword = await user.comparePassword(params.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedError();
    }
    const uuid = uuidv4();
    const token = user.createJWT(uuid);
    const refresh = user.createRefresh(uuid);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token,
      refresh,
    };
  }

  //! END OF FILE
}
