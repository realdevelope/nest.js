import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Cat, CatSchama } from 'src/cats.schema';
import { CatsController } from './controller/cats.controller';
import { CatsService } from '../services/cats.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchama }]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], //모듈은 기본적으로 공급자를 캡슐화 하기때문에 exprot 하지 않으면 삽입x
})
export class CatsModule {}
