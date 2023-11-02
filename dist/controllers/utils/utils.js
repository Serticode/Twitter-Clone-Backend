"use strict";
//!
//! UTILS FOR USER PROFILE PHOTOS START HERE
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttachmentPhotoName = exports.getAttachmentsRootDir = exports.getAttachmentPath = exports.getUserIdProfilePhotoPath = exports.getUserIdProfilePhotoName = exports.getProfilePhotosRootDir = void 0;
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
//!
//!
//! ATTACHMENTS
const getAttachmentPath = function (attachmentId) {
    return (0, exports.getAttachmentsRootDir)() + (0, exports.getAttachmentPhotoName)(attachmentId);
};
exports.getAttachmentPath = getAttachmentPath;
const getAttachmentsRootDir = function () {
    return __dirname + "/../uploads/images/attachment/";
};
exports.getAttachmentsRootDir = getAttachmentsRootDir;
const getAttachmentPhotoName = function (attachmentId) {
    return attachmentId + ".jpg";
};
exports.getAttachmentPhotoName = getAttachmentPhotoName;
