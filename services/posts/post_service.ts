import Post from "../../database/models/posts/posts";
import Reaction from "../../database/models/reactions/reaction";
import {
  InvalidInputError,
  OriginalPostIdMissingError,
  PostNotFoundError,
  ReactionNotFoundError,
} from "../../errors";
import {
  CreatePostParams,
  CreateReactionParams,
  PostType,
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
}
