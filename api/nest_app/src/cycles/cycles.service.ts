import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CycleDto, CycleDtoEdit } from './cycle.dto';
import { CycleIfc } from './cycle.interface';

@Injectable()
export class CyclesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number): Promise<CycleIfc[]> {
    return await this.prisma.cycle.findMany({
      where: {
        userId: userId,
      },
    });
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

  // サイクルを消去する(erasedをtrueに変更する)処理
  async erase(id: number): Promise<void> {
    await this.prisma.cycle.update({
      where: { id: id },
      data: { erased: true },
    });
  }

  // 消去されたサイクル一覧を取得
  async findTrashedCycles(userId: number): Promise<CycleIfc[]> {
    return await this.prisma.cycle.findMany({
      where: { userId: userId, erased: true },
    });
  }

  // サイクルを復元する(erasedをfalseに変更する)処理
  async restore(id: number): Promise<void> {
    await this.prisma.cycle.update({
      where: { id: id },
      data: { erased: false },
    });
  }

  async delete(id: number): Promise<void> {
    const cycle = await this.prisma.cycle.findUnique({
      where: { id: id },
    });

    // サイクルが消去済でなければ削除処理に入らないようにしている。
    if (cycle.erased) {
      await this.prisma.cycle.delete({
        where: { id: id },
      });
    }
  }
}
