import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Action } from '@prisma/client';
import { ActionsService } from './actions.service';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionService: ActionsService) {}

  @Get(':cycleId/:round')
  async findAction(
    @Param('cycleId', ParseIntPipe) cycleId: number,
    @Param('round', ParseIntPipe) round: number,
  ): Promise<Action> {
    return await this.actionService.findAction(cycleId, round);
  }

  @Put('update-complete/:id')
  async updateComplete(
    @Param('id', ParseIntPipe) id: number,
    @Body('complete', ParseBoolPipe) complete: boolean,
  ): Promise<void> {
    await this.actionService.updateComplete(id, complete);
  }
}
