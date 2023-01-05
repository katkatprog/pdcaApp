import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Cycle } from '@prisma/client';
import { ActionsService } from 'src/actions/actions.service';
import { ChecksService } from 'src/checks/checks.service';
import { DosService } from 'src/dos/dos.service';
import { PlansService } from 'src/plans/plans.service';
import { CycleDto, CycleDtoEdit } from './cycle.dto';
import { CyclesService } from './cycles.service';

@Controller('cycles')
export class CyclesController {
  constructor(
    private readonly cyclesService: CyclesService,
    private readonly plansService: PlansService,
    private readonly dosService: DosService,
    private readonly checksService: ChecksService,
    private readonly actionsService: ActionsService,
  ) {}

  @Get(':userId')
  async findAll(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Cycle[]> {
    return await this.cyclesService.findAll(userId);
  }

  // 消去されたサイクル一覧
  @Get('trashed/:userId')
  async findTrashedCycles(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Cycle[]> {
    return await this.cyclesService.findTrashedCycles(userId);
  }

  // サイクルの詳細を取得 サイクルのIDをURLパラメータに表示させるため、
  // 上記のメソッドとかぶらないよう、Getの一番下に記載している。
  @Get(':id/:userId')
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Cycle> {
    return await this.cyclesService.findById(id, userId);
  }

  // サイクルの新規作成
  @Post('create')
  async create(@Body() cycleDto: CycleDto): Promise<Cycle> {
    return await this.cyclesService.create(cycleDto);
  }

  // 新しい周のP,D,C,Aのデータを作成する処理
  // frontとの兼ね合いにより、戻り値は新しい周が入ったオブジェクトとしている
  @Post('create-pdca/:id/:round')
  async createPDCA(
    @Param('id', ParseIntPipe) id: number,
    @Param('round', ParseIntPipe) round: number,
  ): Promise<{ round: number }> {
    await Promise.all([
      this.plansService.createPlan(id, round),
      this.dosService.createDo(id, round),
      this.checksService.createCheck(id, round),
      this.actionsService.createAction(id, round),
    ]);
    return { round };
  }

  // サイクルを更新する処理
  @Put('update/:id/:userId')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() cycleDtoEdit: CycleDtoEdit,
  ): Promise<Cycle> {
    return await this.cyclesService.update(id, userId, cycleDtoEdit);
  }

  // サイクルを消去状態を変更する(erasedを変更する)処理
  // 消去されていない→消去 / 消去済み → 復元
  @Put('erase-restore/:id/:userId')
  async erase(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body('erased', ParseBoolPipe) erased: boolean,
  ): Promise<{
    erased: boolean;
  }> {
    return await this.cyclesService.eraseOrRestore(id, userId, erased);
  }

  // サイクルをお気に入りに登録する処理
  @Put('favorite/:id/:userId')
  async favorite(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body('favorite', ParseBoolPipe) favorite: boolean,
  ): Promise<{
    favorite: boolean;
  }> {
    return await this.cyclesService.favorite(id, userId, favorite);
  }

  // サイクルの完全な削除
  @Delete(':id/:userId')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    return await this.cyclesService.delete(id, userId);
  }
}
