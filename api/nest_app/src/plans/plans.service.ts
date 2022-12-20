import { Injectable } from '@nestjs/common';
import { Plan } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  async findPlan(cycleId: number, round: number): Promise<Plan> {
    return await this.prisma.plan.findFirst({ where: { cycleId, round } });
  }

  async createPlan(cycleId: number, round: number): Promise<void> {
    await this.prisma.plan.create({
      data: {
        cycleId,
        round,
      },
    });
  }

  async updateStartDate(
    cycleId: number,
    round: number,
    date: Date,
  ): Promise<void> {
    await this.prisma.plan.updateMany({
      where: { cycleId, round },
      data: {
        startDate: date,
      },
    });
  }

  async updateEndDate(
    cycleId: number,
    round: number,
    date: Date,
  ): Promise<void> {
    await this.prisma.plan.updateMany({
      where: { cycleId, round },
      data: {
        endDate: date,
      },
    });
  }

  async updateComplete(
    cycleId: number,
    round: number,
    complete: boolean,
  ): Promise<void> {
    await this.prisma.plan.updateMany({
      where: { cycleId, round },
      data: { complete },
    });
  }
}
