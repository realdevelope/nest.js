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
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgURl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    password: string;
  };
}

export const CatSchama = SchemaFactory.createForClass(Cat);

CatSchama.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    password: this.password,
  };
});
