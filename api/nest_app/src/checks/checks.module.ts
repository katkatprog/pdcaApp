import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChecksController } from './checks.controller';
import { ChecksService } from './checks.service';

@Module({
  controllers: [ChecksController],
  providers: [ChecksService, PrismaService],
})
export class ChecksModule {}
