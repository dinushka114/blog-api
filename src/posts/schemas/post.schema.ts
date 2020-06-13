import * as mongoose from "mongoose";

export const PostSchema = new mongoose.Schema({
  postId:String,
  title: String,
  description: String,
  body: String,
  author: String,
  date_posted: String,
});
