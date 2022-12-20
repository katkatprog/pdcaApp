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

  @Put('update-date/:cycleId/:round')
  async updateDate(
    @Param('cycleId', ParseIntPipe) cycleId: number,
    @Param('round', ParseIntPipe) round: number,
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate: Date,
  ): Promise<void> {
    await this.plansService.updateDate(cycleId, round, startDate, endDate);
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
