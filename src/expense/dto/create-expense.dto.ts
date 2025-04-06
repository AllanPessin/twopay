import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  value: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsNumber()
  recurrence: number;

  @IsBoolean()
  @IsOptional()
  paid?: boolean;

  @IsNumber()
  categoryId?: number;
}
