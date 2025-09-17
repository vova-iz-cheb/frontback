import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//нафига?
export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true, maxLength: 10 })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  postId: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
