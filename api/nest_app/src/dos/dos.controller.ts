import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Do } from '@prisma/client';
import { DosService } from './dos.service';

@Controller('dos')
export class DosController {
  constructor(private readonly dosService: DosService) {}

  @Get(':cycleId/:round')
  async findDo(
    @Param('cycleId', ParseIntPipe) cycleId: number,
    @Param('round', ParseIntPipe) round: number,
  ): Promise<Do> {
    return await this.dosService.findDo(cycleId, round);
  }

  @Put('update-complete/:id')
  async updateComplete(
    @Param('id', ParseIntPipe) id: number,
    @Body('complete', ParseBoolPipe) complete: boolean,
  ): Promise<void> {
    await this.dosService.updateComplete(id, complete);
  }
}