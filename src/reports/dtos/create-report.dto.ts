import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  @Max(200000000)
  price: number;

  @IsInt()
  makeId: number;

  @IsInt()
  modelId: number;

  @IsInt()
  @Min(1930)
  @Max(2077)
  year: number;

  @IsInt()
  @IsPositive()
  mileage: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;
}
