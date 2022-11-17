import {
  Body,
  Controller,
  Delete,
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
  @Get(':userId')
  async findAll(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CycleIfc[]> {
    return await this.cyclesService.findAll(userId);
  }

  // 消去されたサイクル一覧
  @Get('trashed/:userId')
  async findTrashedCycles(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CycleIfc[]> {
    return await this.cyclesService.findTrashedCycles(userId);
  }

  // サイクルの詳細を取得 サイクルのIDをURLパラメータに表示させるため、
  // 上記のメソッドとかぶらないよう、Getの一番下に記載している。
  @Get(':id/:userId')
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CycleIfc> {
    return await this.cyclesService.findById(id, userId);
  }

  @Post('create')
  async create(@Body() cycleDto: CycleDto): Promise<void> {
    return await this.cyclesService.create(cycleDto);
  }

  @Put('update/:id/:userId')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() cycleDtoEdit: CycleDtoEdit,
  ): Promise<void> {
    return await this.cyclesService.update(id, userId, cycleDtoEdit);
  }

  // サイクルを消去する(erasedをtrueに変更する)処理
  @Put('erase/:id/:userId')
  async erase(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.cyclesService.erase(id, userId);
  }

  // 消去されたサイクルを復元する(erasedをfalseに変更する)処理
  @Put('restore/:id/:userId')
  async restore(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.cyclesService.restore(id, userId);
  }

  // 消去されたサイクルを復元する(erasedをfalseに変更する)処理
  @Put('favorite/:id/:userId')
  async favorite(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.cyclesService.favorite(id, userId);
  }

  // サイクルの完全な削除
  @Delete(':id/:userId')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.cyclesService.delete(id, userId);
  }
}
