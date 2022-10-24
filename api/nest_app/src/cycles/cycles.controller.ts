import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CyclesService } from './cycles.service';

@Controller('cycles')
export class CyclesController {
  constructor(private readonly cyclesService: CyclesService) {}
  @Get('')
  findAll() {
    return this.cyclesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.cyclesService.findById(id);
  }
}
