import { InterestDocument } from "../../database/models/interests/interests";
import { User } from "./auth_models";

export interface UserInterestsCreationParams {
  userID: string;
  interests: InterestDocument[];
}

export interface UserAndInterests {
  user: User;
  interests: InterestDocument[];
}
