import Profile from "../../database/models/profile/profile_model";
import { UserProfileNotFoundError } from "../../errors/profile_not_found";
import { Profile as ProfileModel } from "../models/profile_model";

export default class ProfileService {
  //!
  //! FETCHING USER PROFILE
  public async get(userId: string): Promise<ProfileModel> {
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      throw new UserProfileNotFoundError();
    }
    return profile.toJSON() as ProfileModel;
  }

  //!
  //! STORING / SAVING USER PROFILE
  public async set(
    userId: String,
    profileModel: ProfileModel
  ): Promise<ProfileModel> {
    const profile = await Profile.findOneAndUpdate(
      { userId },
      {
        userId,
        bio: profileModel.bio,
        location: profileModel.location,
        website: profileModel.website,
      },
      { upsert: true, new: true, runValidators: true }
    );
    return profile.toJSON() as ProfileModel;
  }
}
