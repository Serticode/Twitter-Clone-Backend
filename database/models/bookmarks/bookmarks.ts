import { Document, Schema, model } from "mongoose";
import { PostDocument } from "../../../database/models/posts/posts";

const BookmarksSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [],
});

//! DEFINE THE "toJSON" METHOD WITHIN THE SCHEMA OPTIONS
BookmarksSchema.set("toJSON", {
  transform: function (_doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export interface BookmarksDocument extends Document {
  userID: string;
  posts: PostDocument[];
}

export default model<BookmarksDocument>("Bookmarks", BookmarksSchema);
