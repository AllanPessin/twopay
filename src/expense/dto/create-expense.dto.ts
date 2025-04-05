import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  description: string;

  @IsDecimal({
    decimal_digits: '0,2',
    force_decimal: true,
    locale: 'pt-BR',
  })
  value: number;

  @IsDate()
  date: Date;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsNumber()
  recurrence: number;

  @IsBoolean()
  @IsOptional()
  paid: boolean;

  @IsNumber()
  userId: number;
}
