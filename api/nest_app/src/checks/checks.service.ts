import { Injectable } from '@nestjs/common';
import { Check } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChecksService {
  constructor(private readonly prisma: PrismaService) {}

  async findCheck(cycleId: number, round: number): Promise<Check> {
    return await this.prisma.check.findFirst({ where: { cycleId, round } });
  }

  async createCheck(cycleId: number, round: number): Promise<void> {
    await this.prisma.check.create({
      data: {
        cycleId,
        round,
      },
    });
  }

  async updateComplete(id: number, complete: boolean): Promise<void> {
    await this.prisma.check.update({
      where: { id },
      data: { complete },
    });
  }
}