import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CycleDto } from './cycle.dto';
import { CycleIfc } from './cycle.interface';

@Injectable()
export class CyclesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.cycle.findMany();
  }

  async findById(id: number) {
    return await this.prisma.cycle.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(cycleDto: CycleDto) {
    await this.prisma.cycle.create({
      data: cycleDto,
    });
  }
}
