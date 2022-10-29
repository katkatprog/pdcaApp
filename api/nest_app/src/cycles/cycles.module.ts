import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CyclesController } from './cycles.controller';
import { CyclesService } from './cycles.service';

@Module({
  controllers: [CyclesController],
  providers: [CyclesService, PrismaService],
})
export class CyclesModule {}
