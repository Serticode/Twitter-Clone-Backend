import { Document, Schema, model } from "mongoose";
import { Post } from "../../../services/models/post_model";

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

//! DEFINE THE "toJSON" METHOD WITHIN THE SCHEMA OPTIONS
TopicSchema.set("toJSON", {
  transform: function (_doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export interface TopicDocument extends Document {
  name: string;
  posts: Post[];
}

export default model<TopicDocument>("Topics", TopicSchema);
