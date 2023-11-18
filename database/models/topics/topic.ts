import { model, Schema, Types } from "mongoose";

const TopicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

TopicSchema.methods.toJSON = function () {
  return {
    id: this._id,
    userId: this.userId,
    postId: this.postId,
    name: this.name,
    description: this.description,
    type: this.type,
    posts: this.posts,
  };
};

interface TopicDocument extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  reaction: ReactionType;
  toJSON: () => any;
}

enum ReactionType {
  like = "like",
}

export default model<TopicDocument>("Topic", TopicSchema);
