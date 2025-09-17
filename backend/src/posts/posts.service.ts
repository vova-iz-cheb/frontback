import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';

// TODO lean toObject exec

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  findAll() {
    return this.postModel.find();
  }

  async findOne(id: number) {
    const post = await this.postModel.findOne({ postId: id }).exec(); // TODO: _id обычно ObjectId а не то что ты введешь

    if (!post) throw new NotFoundException('Не удалось найти пост.');

    return post;
  }

  async create(postData: CreatePostDto) {
    // const post = new this.postModel(postData);

    // // TODO: надо нормально возвращать без __v _id И в getall тоже
    // return await post.save();

    return await this.postModel.create(postData);
  }

  async update(id: number, postData: UpdatePostDto) {
    const post = await this.postModel.findOne({ postId: id }).exec();

    if (!post) throw new NotFoundException('Не удалось найти пост.');

    const newPost = await this.postModel
      .findOneAndUpdate({ _id: post._id }, postData, {
        new: true,
        runValidators: true,
      })
      .exec(); // зачем exec?

    return newPost;

    // Object.assign(post, postData);
    // return await post.save();
  }

  async remove(id: number) {
    const post = await this.postModel.findOne({ postId: id }).exec();

    if (!post) throw new NotFoundException('Не удалось найти пост.');

    return await this.postModel.findByIdAndDelete(post);
  }
}
