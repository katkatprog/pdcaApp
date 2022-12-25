import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TaskDto {
  @IsNotEmpty({ message: 'タスク名を入力してください。' })
  @IsString({ message: 'タスク名は文字列である必要があります。' })
  name: string;

  @IsString({ message: '概要は文字列である必要があります。' })
  about: string;

  @Type(() => Number)
  @IsNumber(undefined, {
    message: 'ステータスIDは数値型である必要があります。',
  })
  statusId: number;
  startDate: Date;
  endDate: Date;
  // @Type(() => Date)
  // @IsDate({ message: '開始日は日付型である必要があります。' })
  // startDate: Date;

  // @Type(() => Date)
  // @IsDate({ message: '終了日は日付型である必要があります。' })
  // endDate: Date;
}
