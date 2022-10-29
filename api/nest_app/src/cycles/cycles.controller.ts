import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CycleDto } from './cycle.dto';
import { CyclesService } from './cycles.service';

@Controller('cycles')
export class CyclesController {
  constructor(private readonly cyclesService: CyclesService) {}
  @Get('')
  async findAll() {
    return await this.cyclesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.cyclesService.findById(id);
  }

  @Post('create')
  async create(@Body() cycleDto: CycleDto) {
    return await this.cyclesService.create(cycleDto);
  }
}
