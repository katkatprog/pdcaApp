import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CycleDto, CycleDtoEdit } from './cycle.dto';
import { CycleIfc } from './cycle.interface';
import { CyclesService } from './cycles.service';

@Controller('cycles')
export class CyclesController {
  constructor(private readonly cyclesService: CyclesService) {}
  @Get('')
  async findAll(): Promise<CycleIfc[]> {
    return await this.cyclesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<CycleIfc> {
    return await this.cyclesService.findById(id);
  }

  @Post('create')
  async create(@Body() cycleDto: CycleDto): Promise<void> {
    return await this.cyclesService.create(cycleDto);
  }

  @Put('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() cycleDtoEdit: CycleDtoEdit,
  ): Promise<void> {
    return await this.cyclesService.update(id, cycleDtoEdit);
  }
}
