import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Check } from '@prisma/client';
import { ChecksService } from './checks.service';

@Controller('checks')
export class ChecksController {
  constructor(private readonly checksService: ChecksService) {}

  @Get(':cycleId/:round')
  async findCheck(
    @Param('cycleId', ParseIntPipe) cycleId: number,
    @Param('round', ParseIntPipe) round: number,
  ): Promise<Check> {
    return await this.checksService.findCheck(cycleId, round);
  }

  @Put('update-complete/:id')
  async updateComplete(
    @Param('id', ParseIntPipe) id: number,
    @Body('complete', ParseBoolPipe) complete: boolean,
  ): Promise<void> {
    await this.checksService.updateComplete(id, complete);
  }
}