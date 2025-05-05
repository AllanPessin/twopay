import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  value: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsNumber()
  @Min(1)
  recurrence: number;

  @IsBoolean()
  @IsOptional()
  paid?: boolean = false;

  @IsNumber()
  categoryId?: number;
}
