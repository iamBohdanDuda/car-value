import { IsString } from 'class-validator';

export class AddMakeDto {
  @IsString()
  name: string;
}
