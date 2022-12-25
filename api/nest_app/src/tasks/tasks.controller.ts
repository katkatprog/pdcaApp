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
import { Task } from '@prisma/client';
import { TaskDto } from './task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':cycleId/:round')
  async findAll(
    @Param('cycleId', ParseIntPipe) cycleId: number,
    @Param('round', ParseIntPipe) round: number,
  ): Promise<Task[]> {
    return await this.tasksService.findAll(cycleId, round);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.findById(id);
  }

  @Post(':cycleId/:round')
  async create(
    @Param('cycleId', ParseIntPipe) cycleId: number,
    @Param('round', ParseIntPipe) round: number,
    @Body() taskDto: TaskDto,
  ): Promise<void> {
    taskDto.statusId = 0; //未完了に設定
    await this.tasksService.create(cycleId, round, taskDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskDto: TaskDto,
  ): Promise<void> {
    await this.tasksService.update(id, taskDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.tasksService.delete(id);
  }
}
