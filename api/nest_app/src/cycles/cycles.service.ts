import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CycleDto, CycleDtoEdit } from './cycle.dto';
import { CycleIfc } from './cycle.interface';

@Injectable()
export class CyclesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CycleIfc[]> {
    return await this.prisma.cycle.findMany();
  }

  async findById(id: number): Promise<CycleIfc> {
    return await this.prisma.cycle.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(cycleDto: CycleDto): Promise<void> {
    await this.prisma.cycle.create({
      data: cycleDto,
    });
  }

  async update(id: number, cycleDtoEdit: CycleDtoEdit): Promise<void> {
    await this.prisma.cycle.update({
      where: { id: id },
      data: cycleDtoEdit,
    });
  }
}
