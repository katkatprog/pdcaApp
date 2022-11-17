import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
        erased: false,
      },
    });
  }

  async findById(id: number, userId: number): Promise<CycleIfc> {
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

  async create(cycleDto: CycleDto): Promise<void> {
    await this.prisma.cycle.create({
      data: cycleDto,
    });
  }

  async update(
    id: number,
    userId: number,
    cycleDtoEdit: CycleDtoEdit,
  ): Promise<void> {
    const cycle = await this.findById(id, userId); //指定のサイクルの存在確認
    if (cycle.erased == true) {
      throw new ForbiddenException('そのサイクルは消去されています。');
    }
    await this.prisma.cycle.update({
      where: { id: id },
      data: cycleDtoEdit,
    });
  }

  // サイクルを消去する(erasedをtrueに変更する)処理
  async erase(id: number, userId: number): Promise<void> {
    const cycle = await this.findById(id, userId); //指定のサイクルの存在確認
    if (cycle.erased == true) {
      throw new ForbiddenException('そのサイクルはすでに消去されています。');
    }
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
  async restore(id: number, userId: number): Promise<void> {
    const cycle = await this.findById(id, userId); //指定のサイクルの存在確認
    if (cycle.erased == false) {
      throw new ForbiddenException('そのサイクルは消去されていません。');
    }
    await this.prisma.cycle.update({
      where: { id: id },
      data: { erased: false },
    });
  }

  // サイクルをお気に入りする処理(付ける/外す両方対応)
  async favorite(id: number, userId: number): Promise<void> {
    const cycle = await this.findById(id, userId); //指定のサイクルの存在確認
    if (cycle.erased == true) {
      throw new ForbiddenException('そのサイクルはすでに消去されています。');
    }
    await this.prisma.cycle.update({
      where: { id: id },
      data: { favorite: !cycle.favorite },
    });
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
