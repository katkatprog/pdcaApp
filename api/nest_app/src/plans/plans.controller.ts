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

  @Put('update-start-date/:id')
  async updateStartDate(
    @Param('id', ParseIntPipe) id: number,
    @Body('startDate') startDate: Date,
  ): Promise<void> {
    await this.plansService.updateStartDate(id, startDate);
  }

  @Put('update-end-date/:id')
  async updateEndDate(
    @Param('id', ParseIntPipe) id: number,
    @Body('endDate') endDate: Date,
  ): Promise<void> {
    await this.plansService.updateEndDate(id, endDate);
  }

  @Put('update-complete/:id')
  async updateComplete(
    @Param('id', ParseIntPipe) id: number,
    @Body('complete', ParseBoolPipe) complete: boolean,
  ): Promise<void> {
    await this.plansService.updateComplete(id, complete);
  }
}
