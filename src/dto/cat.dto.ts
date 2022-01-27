import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from 'src/cats.schema';

export class CatRequestDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '234234234',
    description: 'id',
  })
  id: string;
}
