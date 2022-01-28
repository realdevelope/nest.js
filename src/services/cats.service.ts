import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from 'src/cats.schema';
import { CatRequestDto } from 'src/dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);

    return readOnlyCats;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;

    console.log(fileName);

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);
  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExit = await this.catsRepository.existsByEmail(email);

    //중복체크
    if (isCatExit) {
      throw new UnauthorizedException('이미 존재합니다.');
    }

    //패스워드 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
