import { Injectable, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { Posts } from "./interfaces/posts.interface";
import { createPostDto } from "../posts/dtos/posts.dto";

@Injectable()
export class PostsService {
  constructor(@Inject("POST_MODEL") private readonly postModel: Model<Posts>) {}

  async findAllPost(): Promise<Posts[]> {
    const posts = await this.postModel.find();
    return posts;
  }

  async findOnePost(id: String): Promise<Posts> {
    const post = await this.postModel.findById(id);
    return post;
  }

  async createPost(createpostDto: createPostDto): Promise<Posts> {
    const { title, description, body, author } = createpostDto;
    const date = new Date();
    const dateCreate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const newPost = {
      title: title,
      description: description,
      body: body,
      author: author,
      date_posted: dateCreate,
    };
    const createdPost = await new this.postModel(newPost);
    return createdPost.save();
  }

  async updatePost(id: string, createpostDto: createPostDto) {
    const updatedPost = await this.postModel.findByIdAndUpdate(
      id,
      createpostDto,
      { new: true }
    );
    return updatedPost;
  }

  async deletePost(id: string) {
    const deletedPost = await this.postModel.findByIdAndDelete(id);
    return deletedPost;
  }
}
