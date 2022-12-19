import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DosController } from './dos.controller';
import { DosService } from './dos.service';

@Module({
  controllers: [DosController],
  providers: [DosService, PrismaService],
})
export class DosModule {}
