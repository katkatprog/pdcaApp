import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(cycleId: number, round: number): Promise<Task[]> {
    return await this.prisma.task.findMany({ where: { cycleId, round } });
  }

  async findById(id: number): Promise<Task> {
    return await this.prisma.task.findFirstOrThrow({ where: { id } });
  }

  async create(
    cycleId: number,
    round: number,
    taskDto: TaskDto,
  ): Promise<Task> {
    return await this.prisma.task.create({
      data: { cycleId, round, ...taskDto },
    });
  }

  async update(id: number, taskDto: TaskDto): Promise<Task> {
    const task = await this.findById(id);
    return await this.prisma.task.update({ where: { id }, data: taskDto });
  }

  async updateComplete(
    id: number,
    complete: boolean,
  ): Promise<{ complete: boolean }> {
    const task = await this.findById(id);
    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: { complete: complete },
    });
    return { complete: updatedTask.complete };
  }

  async delete(id: number): Promise<void> {
    const task = await this.findById(id);
    await this.prisma.task.delete({ where: { id } });
  }
}
