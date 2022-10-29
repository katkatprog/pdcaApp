import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CycleIfc } from './cycle.interface';

@Injectable()
export class CyclesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.cycle.findMany();
  }

  async findById(id: number) {
    // Paramsで取得した値はstringとなってしまうので、numberに変換
    // 後でバリデーションを実装したら直す
    return await this.prisma.cycle.findUnique({
      where: {
        id: Number(id),
      },
    });
  }
}
