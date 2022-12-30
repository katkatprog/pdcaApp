import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CycleDto {
  @IsString({ message: 'サイクル名は文字列で入力してください。' })
  @IsNotEmpty({ message: 'サイクル名は必須項目です。' })
  @MaxLength(20, { message: 'サイクル名は20文字以内で入力してください。' })
  name: string;

  @IsString({ message: 'サイクルの概要は文字列で入力してください。' })
  about: string;

  @IsString({ message: 'サイクルの目標は文字列で入力してください。' })
  @IsNotEmpty({ message: 'サイクルの目標は必須項目です。' })
  @MaxLength(40, { message: 'サイクルの目標は40文字以内で入力してください。' })
  goal: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
