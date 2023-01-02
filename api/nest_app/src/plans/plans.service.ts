import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Plan } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  async findPlan(cycleId: number, round: number): Promise<Plan> {
    return await this.prisma.plan.findFirst({ where: { cycleId, round } });
  }

  async getLatestRound(cycleId: number): Promise<number> {
    const latestRoundObj = await this.prisma.plan.aggregate({
      _max: {
        round: true,
      },
      where: { cycleId },
    });

    const latestRound: number | null = latestRoundObj._max.round;
    if (!latestRound) {
      throw new InternalServerErrorException('planが存在しません。');
    }

    return latestRound;
  }

  async createPlan(cycleId: number, round: number): Promise<void> {
    await this.prisma.plan.create({
      data: {
        cycleId,
        round,
      },
    });
  }

  async updateDate(
    cycleId: number,
    round: number,
    startDate: Date,
    endDate: Date,
  ): Promise<void> {
    if (startDate && endDate && endDate < startDate) {
      throw new BadRequestException('開始日が終了日より後になっています。');
    }
    await this.prisma.plan.updateMany({
      where: { cycleId, round },
      data: {
        startDate,
        endDate,
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
