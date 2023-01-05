import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cycle } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CycleDto, CycleDtoEdit } from './cycle.dto';

@Injectable()
export class CyclesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number): Promise<Cycle[]> {
    return await this.prisma.cycle.findMany({
      where: {
        userId: userId,
        erased: false,
      },
    });
  }

  async findById(id: number, userId: number): Promise<Cycle> {
    const cycle = await this.prisma.cycle.findUnique({
      where: {
        id: id,
      },
    });
    if (!cycle) {
      throw new NotFoundException('そのサイクルは存在しません。');
    }
    if (cycle.userId != userId) {
      throw new ForbiddenException('そのサイクルへのアクセス権がありません。');
    }
    return cycle;
  }

  async create(cycleDto: CycleDto): Promise<Cycle> {
    const createdCycle = await this.prisma.cycle.create({
      data: cycleDto,
    });
    return createdCycle;
  }

  async update(
    id: number,
    userId: number,
    cycleDtoEdit: CycleDtoEdit,
  ): Promise<Cycle> {
    const cycle = await this.findById(id, userId); //指定のサイクルの存在確認
    if (cycle.erased == true) {
      throw new ForbiddenException('そのサイクルは消去されています。');
    }
    return await this.prisma.cycle.update({
      where: { id: id },
      data: cycleDtoEdit,
    });
  }

  // サイクルを消去する/復元する処理(erasedを変更する)処理
  async eraseOrRestore(
    id: number,
    userId: number,
  ): Promise<{ erased: boolean }> {
    const cycle = await this.findById(id, userId); //指定のサイクルの存在確認
    const updatedCycle = await this.prisma.cycle.update({
      where: { id: id },
      data: { erased: !cycle.erased },
    });
    return { erased: updatedCycle.erased };
  }

  // 消去されたサイクル一覧を取得
  async findTrashedCycles(userId: number): Promise<Cycle[]> {
    return await this.prisma.cycle.findMany({
      where: { userId: userId, erased: true },
    });
  }

  // サイクルをお気に入りする処理(付ける/外す両方対応)
  async favorite(id: number, userId: number): Promise<{ favorite: boolean }> {
    const cycle = await this.findById(id, userId); //指定のサイクルの存在確認
    if (cycle.erased == true) {
      throw new ForbiddenException('そのサイクルはすでに消去されています。');
    }
    const updatedCycle = await this.prisma.cycle.update({
      where: { id: id },
      data: { favorite: !cycle.favorite },
    });
    return { favorite: updatedCycle.favorite };
  }

  async delete(id: number, userId: number): Promise<void> {
    const cycle = await this.findById(id, userId); //指定のサイクルの存在確認
    // サイクルが消去済でなければ削除処理に至らないようにしている。
    if (!cycle.erased)
      throw new BadRequestException('消去済みのサイクルしか削除できません。');
    await this.prisma.cycle.delete({
      where: { id: id },
    });
  }
}
