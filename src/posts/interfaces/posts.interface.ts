import { Document } from "mongoose";

export interface Posts extends Document {
  readonly postId:String;
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly author: string;
  readonly date_posted: string;
}
