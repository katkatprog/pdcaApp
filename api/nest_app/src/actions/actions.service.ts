import { Injectable } from '@nestjs/common';
import { Action } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAction(cycleId: number, round: number): Promise<Action> {
    return await this.prisma.action.findFirst({ where: { cycleId, round } });
  }

  async createAction(cycleId: number, round: number): Promise<void> {
    await this.prisma.action.create({
      data: {
        cycleId,
        round,
      },
    });
  }

  async updateComplete(id: number, complete: boolean): Promise<void> {
    await this.prisma.action.update({
      where: { id },
      data: { complete },
    });
  }
}
