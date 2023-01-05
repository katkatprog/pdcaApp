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
  ): Promise<Task> {
    return await this.tasksService.create(cycleId, round, taskDto);
  }

  @Put('update-complete/:id')
  async updateComplete(
    @Param('id', ParseIntPipe) id: number,
    @Body('complete', ParseBoolPipe) complete: boolean,
  ): Promise<{ complete: boolean }> {
    return await this.tasksService.updateComplete(id, complete);
  }

  @Put('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskDto: TaskDto,
  ): Promise<Task> {
    return await this.tasksService.update(id, taskDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.tasksService.delete(id);
  }
}
