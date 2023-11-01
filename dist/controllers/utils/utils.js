"use strict";
//!
//! UTILS FOR USER PROFILE PHOTOS START HERE
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdProfilePhotoPath = exports.getUserIdProfilePhotoName = exports.getProfilePhotosRootDir = void 0;
//!
//! FOR PHOTO ROOT DIR
const getProfilePhotosRootDir = function () {
    return __dirname + "/../uploads/images/profile/";
};
exports.getProfilePhotosRootDir = getProfilePhotosRootDir;
//!
//! FOR PHOTO NAME
const getUserIdProfilePhotoName = function (userId) {
    return userId + ".jpg";
};
exports.getUserIdProfilePhotoName = getUserIdProfilePhotoName;
//!
//! FOR PATH
const getUserIdProfilePhotoPath = function (userId) {
    return (0, exports.getProfilePhotosRootDir)() + (0, exports.getUserIdProfilePhotoName)(userId);
};
exports.getUserIdProfilePhotoPath = getUserIdProfilePhotoPath;
