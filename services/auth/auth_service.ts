import User from "database/models/user/user_model";
import {
  UserAndCredentials,
  UserCreationParams,
} from "services/models/auth_models";
import { v4 as uuidv4 } from "uuid";

export default class AuthService {
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
}
