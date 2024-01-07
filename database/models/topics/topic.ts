import { Document, Schema, model } from "mongoose";

export enum TopicEnums {
  Technology = "Technology 🖥️",
  Science = "Science 🥼",
  Art = "Art 🎨",
  History = "History 🏺",
  Animation = "Animation 💫",
  Astrology = "Astrology 👩🏽‍🚀",
  Books = "Books 📚",
  Writing = "Writing ✍🏽",
}

const TopicSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [],
});

TopicSchema.methods.toJSON = function () {
  return {
    id: this._id,
    name: this.name,
    posts: this.posts,
  };
};

export interface TopicDocument extends Document {
  name: string;
  posts: [];
  toJSON: () => any;
}

export default model<TopicDocument>("Topics", TopicSchema);
