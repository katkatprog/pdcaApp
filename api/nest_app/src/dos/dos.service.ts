import { Injectable } from '@nestjs/common';
import { Do } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DosService {
  constructor(private readonly prisma: PrismaService) {}

  async findDo(cycleId: number, round: number): Promise<Do> {
    return await this.prisma.do.findFirst({ where: { cycleId, round } });
  }

  async createDo(cycleId: number, round: number): Promise<Do> {
    return await this.prisma.do.create({
      data: {
        cycleId,
        round,
      },
    });
  }

  async updateComplete(
    cycleId: number,
    round: number,
    complete: boolean,
  ): Promise<{ complete: boolean }> {
    await this.prisma.do.updateMany({
      where: { cycleId, round },
      data: { complete },
    });
    return {
      complete: complete,
    };
  }
}
