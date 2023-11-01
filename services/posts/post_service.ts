import { UploadedFile } from "express-fileupload";
import { mkdir } from "node:fs/promises";
import {
  getAttachmentPath,
  getAttachmentsRootDir,
} from "../../controllers/utils/utils";
import Attachment from "../../database/models/attachment/attachment";
import Post from "../../database/models/posts/posts";
import Reaction from "../../database/models/reactions/reaction";
import {
  InternalServerError,
  InvalidInputError,
  InvalidMimeTypeError,
  NoPhotoUploadedError,
  OriginalPostIdMissingError,
  PostNotFoundError,
  ReactionNotFoundError,
} from "../../errors";
import {
  CreatePostParams,
  CreateReactionParams,
  PostType,
  Attachment as TSOAAttachmentModel,
  Post as TSOAPostModel,
  Reaction as TSOAReactionModel,
} from "../models/post_model";

export default class PostsService {
  //!
  //! CREATE POST
  public async createPost(
    userId: String,
    params: CreatePostParams
  ): Promise<TSOAPostModel> {
    switch (params.type) {
      case PostType.post: {
        const newPost = await Post.create({
          userId,
          text: params.text,
          type: params.type,
        });

        return newPost.toJSON() as TSOAPostModel;
      }

      case PostType.repost:
      case PostType.reply: {
        if (!params.originalPostId || params.originalPostId === "") {
          throw new OriginalPostIdMissingError();
        }

        const newPost = await Post.create({
          userId,
          text: params.text,
          type: params.type,
          originalPostId: params.originalPostId,
        });

        return newPost.toJSON() as TSOAPostModel;
      }
      default:
        throw new InvalidInputError("type", "PostType");
    }
  }

  //!
  //! REACT TO POST - LIKE A POST
  public async reactToPost(
    userId: String,
    postId: String,
    params: CreateReactionParams
  ): Promise<TSOAReactionModel> {
    const post = await Post.findById(postId);

    if (!post) {
      throw new PostNotFoundError();
    }

    const query = { userId, postId };

    const reaction = await Reaction.findOneAndUpdate(
      query,
      {
        userId,
        postId,
        type: params.type,
      },
      { upsert: true, new: true }
    );

    return reaction.toJSON() as TSOAReactionModel;
  }

  //!
  //! UNREACT TO POST - UNLIKE A POST
  public async unreactToPost(
    userId: String,
    postId: String
  ): Promise<TSOAReactionModel> {
    const reaction = await Reaction.findOneAndDelete({ userId, postId });

    if (!reaction) {
      throw new ReactionNotFoundError();
    }

    return reaction.toJSON() as TSOAReactionModel;
  }

  //!
  //! ATTACH TO POST
  public async attachToPost(
    userId: String,
    postId: String,
    req: { files: { photo: UploadedFile } }
  ): Promise<TSOAAttachmentModel> {
    /*
    reposts cannot have attachments or patched later
    user can only attach to their own posts

    find a post or reply (not a repost), with a given ID
    that is made by the current user and has no attachments
    */
    const post = await Post.findOne({ _id: postId, userId: userId })
      .where("type")
      .in(["post", "reply"])
      .where("attachmentId")
      .equals(null);

    if (!post) {
      throw new PostNotFoundError();
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      throw new NoPhotoUploadedError();
    }

    const { photo } = req.files as unknown as { photo: UploadedFile };

    if (photo.mimetype !== "image/jpeg") {
      throw new InvalidMimeTypeError();
    }

    //! CREATE NEW ATTACHMENT
    const attachment = await Attachment.create({
      userId,
      postId,
      mimeType: photo.mimetype,
    });

    const attachmentId = attachment._id;
    const uploadRootDir = getAttachmentsRootDir();
    const uploadPath = getAttachmentPath(attachmentId);

    try {
      await mkdir(uploadRootDir, { recursive: true });
      await photo.mv(uploadPath);
      //! UPDATE ORIGINAL POST WITH ATTACHMENT ID
      post.attachmentId = attachmentId;
      await post.save();
      return attachment.toJSON() as TSOAAttachmentModel;
    } catch (err) {
      //! IN CASE OF ERROR, DELETE ATTACHMENT
      await Attachment.findByIdAndDelete(attachmentId);
      throw new InternalServerError();
    }
  }
}
