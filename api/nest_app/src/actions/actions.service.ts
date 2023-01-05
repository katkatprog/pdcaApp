import { Injectable } from '@nestjs/common';
import { Action } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAction(cycleId: number, round: number): Promise<Action> {
    return await this.prisma.action.findFirst({ where: { cycleId, round } });
  }

  async createAction(cycleId: number, round: number): Promise<Action> {
    return await this.prisma.action.create({
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
    await this.prisma.action.updateMany({
      where: { cycleId, round },
      data: { complete },
    });
    return { complete: (await this.findAction(cycleId, round)).complete };
  }
}
