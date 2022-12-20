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

  @Get(':cycleId/:round')
  async findPlan(
    @Param('cycleId', ParseIntPipe) cycleId: number,
    @Param('round', ParseIntPipe) round: number,
  ): Promise<Plan> {
    return await this.plansService.findPlan(cycleId, round);
  }

  @Put('update-start-date/:cycleId/:round')
  async updateStartDate(
    @Param('cycleId', ParseIntPipe) cycleId: number,
    @Param('round', ParseIntPipe) round: number,
    @Body('startDate') startDate: Date,
  ): Promise<void> {
    await this.plansService.updateStartDate(cycleId, round, startDate);
  }

  @Put('update-end-date/:cycleId/:round')
  async updateEndDate(
    @Param('cycleId', ParseIntPipe) cycleId: number,
    @Param('round', ParseIntPipe) round: number,
    @Body('endDate') endDate: Date,
  ): Promise<void> {
    await this.plansService.updateEndDate(cycleId, round, endDate);
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
