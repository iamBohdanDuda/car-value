import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  approved: boolean;

  @Expose()
  price: number;

  @Expose()
  @Transform(({ obj }) => obj.make.id)
  makeId: number;

  @Expose()
  @Transform(({ obj }) => obj.model.id)
  modelId: number;

  @Expose()
  year: number;

  @Expose()
  mileage: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;
}
