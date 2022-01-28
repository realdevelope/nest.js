import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/cats.schema';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
