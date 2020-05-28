import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { createPostDto } from "./dtos/posts.dto";
import { ValidateObjectId } from "./pipes/post-validation.pipe";

@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  async getPosts(@Res() res) {
    const posts = await this.postService.findAllPost();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get(":id")
  async getPost(@Res() res, @Param("id") id: string) {
    const post = await this.postService.findOnePost(id);
    if (!post) {
      throw new NotFoundException("Post Does not exists");
    }
    return res.status(HttpStatus.OK).json(post);
  }

  @Post()
  async createPost(@Res() res, @Body() createpostDto: createPostDto) {
    const newPost = await this.postService.createPost(createpostDto);
    return res.status(HttpStatus.OK).json({
      message: "post has been submitted sucessfull",
      post: newPost,
    });
  }

  @Put(":id")
  async updatePost(
    @Res() res,
    @Param("id") id: string,
    @Body() createpostDto: createPostDto
  ) {
    const updatedPost = await this.postService.updatePost(id, createpostDto);
    if (!updatedPost) {
      throw new NotFoundException("Post does not exsists");
    }
    return res.status(HttpStatus.OK).json({
      message: "Post has been updated successfully",
      post: updatedPost,
    });
  }

  @Delete(":id")
  async deletePost(@Res() res, @Param("id") id: string) {
    const post = await this.postService.deletePost(id);
    if (!post) {
      throw new NotFoundException("Post does not exists");
    }

    return res.status(HttpStatus.OK).json({
      message: "Post delete successfully",
    });
  }
}
