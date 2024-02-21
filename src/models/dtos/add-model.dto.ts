import { IsInt, IsString } from 'class-validator';

export class AddModelDto {
  @IsString()
  name: string;

  @IsInt()
  makeId: number;
}
