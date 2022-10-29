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

  // 消去されたサイクル一覧
  @Get('trashed/:userId')
  async findTrashedCycles(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CycleIfc[]> {
    return await this.cyclesService.findTrashedCycles(userId);
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

  // サイクルを消去する(erasedをtrueに変更する)処理
  @Put('erase/:id')
  async erase(@Param('id', ParseIntPipe) id: number) {
    return await this.cyclesService.erase(id);
  }

  // 消去されたサイクルを復元する(erasedをfalseに変更する)処理
  @Put('restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await this.cyclesService.restore(id);
  }
}
