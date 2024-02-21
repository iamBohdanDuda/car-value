import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  makeId: number;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  modelId: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1930)
  @Max(2077)
  year: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsPositive()
  mileage: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;
}
