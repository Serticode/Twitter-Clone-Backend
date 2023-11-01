//!
//! UTILS FOR USER PROFILE PHOTOS START HERE

//!
//! FOR PHOTO ROOT DIR
export const getProfilePhotosRootDir = function (): string {
  return __dirname + "/../uploads/images/profile/";
};

//!
//! FOR PHOTO NAME
export const getUserIdProfilePhotoName = function (userId: string): string {
  return userId + ".jpg";
};

//!
//! FOR PATH
export const getUserIdProfilePhotoPath = function (userId: string): string {
  return getProfilePhotosRootDir() + getUserIdProfilePhotoName(userId);
};
