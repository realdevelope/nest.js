import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from '../../services/cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/SuccessInterceptor';
import { CatRequestDto } from 'src/dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginRequestDto } from 'src/dto/cats.loginRequestDto';
//import { ReadOnlyCatDto } from './dto/cat.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService, private readonly authService) {} //의존성주입

  @ApiOperation({ summary: '현재 데이터 가져오기' })
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiResponse({ status: 500, description: 'server error' })
  @ApiResponse({ status: 200, description: 'success' }) //type: ReadOnlyCatDto })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log(body);
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '이미지 업로드' })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload/cats')
  uploadCatImg(@UploadedFile() files: Array<Express.Multer.File>) {
    console.log(files);

    //업로드이미지 리턴
    return { image: `http:/localhost:8000/media/cats/${files[0].filename}` };

    //   @ApiOperation({ summary: '모든 이미지 가져오기' })
    //   @Get('all')
    //   getAllCat() {
    //     return this.catsService.getAllCat()
    // }
  }
}
