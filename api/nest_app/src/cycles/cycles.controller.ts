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
import { Cycle } from '@prisma/client';
import { ActionsService } from 'src/actions/actions.service';
import { ChecksService } from 'src/checks/checks.service';
import { DosService } from 'src/dos/dos.service';
import { PlansService } from 'src/plans/plans.service';
import { CycleDto } from './cycle.dto';
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

  @Post('create')
  async create(@Body() cycleDto: CycleDto): Promise<void> {
    return await this.cyclesService.create(cycleDto);
  }

  @Post('create-pdca/:cycleId/:round')
  async createPDCA(
    @Param('cycleId', ParseIntPipe) cycleId: number,
    @Param('round', ParseIntPipe) round: number,
  ): Promise<void> {
    Promise.all([
      this.plansService.createPlan(cycleId, round),
      this.dosService.createDo(cycleId, round),
      this.checksService.createCheck(cycleId, round),
      this.actionsService.createAction(cycleId, round),
    ]);
  }

  // goal(目標)の変更
  @Put('update-goal/:id/:userId')
  async updateGoal(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body('goal') newGoal: string,
  ): Promise<void> {
    return await this.cyclesService.updateGoal(id, userId, newGoal);
  }

  // about(概要)の変更
  @Put('update-about/:id/:userId')
  async updateAbout(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body('about') newAbout: string,
  ): Promise<void> {
    return await this.cyclesService.updateAbout(id, userId, newAbout);
  }

  // suspend(保留設定)の変更
  @Put('update-suspend/:id/:userId')
  async updateSuspend(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    return await this.cyclesService.updateSuspend(id, userId);
  }

  // watchFromAnyone(公開設定)の変更
  @Put('update-watch-from-anyone/:id/:userId')
  async updateWatchFromAnyone(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    return await this.cyclesService.updateWatchFromAnyone(id, userId);
  }

  // サイクルを消去状態を変更する(erasedを変更する)処理
  // 消去されていない→消去 / 消去済み → 復元
  @Put('erase-restore/:id/:userId')
  async erase(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.cyclesService.eraseOrRestore(id, userId);
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
