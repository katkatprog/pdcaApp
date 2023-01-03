import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Plan } from '@prisma/client';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get('latest-round/:cycleId')
  async getLatestRound(
    @Param('cycleId', ParseIntPipe) cycleId: number,
  ): Promise<number> {
    return await this.plansService.getLatestRound(cycleId);
  }

  @Get(':cycleId/:round')
  async findPlan(
    @Param('cycleId', ParseIntPipe) cycleId: number,
    @Param('round', ParseIntPipe) round: number,
  ): Promise<Plan> {
    return await this.plansService.findPlan(cycleId, round);
  }

  @Put('update/:cycleId/:round')
  async updateDate(
    @Param('cycleId', ParseIntPipe) cycleId: number,
    @Param('round', ParseIntPipe) round: number,
    @Body('goalInRound') goalInRound: string,
  ): Promise<void> {
    await this.plansService.update(cycleId, round, goalInRound);
  }

  @Put('update-complete/:cycleId/:round')
  async updateComplete(
    @Param('cycleId', ParseIntPipe) cycleId: number,
    @Param('round', ParseIntPipe) round: number,
    @Body('complete', ParseBoolPipe) complete: boolean,
  ): Promise<void> {
    await this.plansService.updateComplete(cycleId, round, complete);
  }
}
