import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  @Max(200000000)
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @IsInt()
  @Min(1930)
  @Max(2077)
  year: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  mileage: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;
}
