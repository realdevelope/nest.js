import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, PromiseProvider, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, //db에서 하나 만들어질 떄 하나씩 찍어주는 것
};

@Schema(options)
export class Cat extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  catname: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgURl: string;
}

export const CatSchama = SchemaFactory.createForClass(Cat);
