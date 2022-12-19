import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';

@Module({
  controllers: [ActionsController],
  providers: [ActionsService, PrismaService],
})
export class ActionsModule {}
