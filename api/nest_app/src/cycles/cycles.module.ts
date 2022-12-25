import { Module } from '@nestjs/common';
import { ActionsService } from 'src/actions/actions.service';
import { ChecksService } from 'src/checks/checks.service';
import { DosService } from 'src/dos/dos.service';
import { PlansService } from 'src/plans/plans.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CyclesController } from './cycles.controller';
import { CyclesService } from './cycles.service';

@Module({
  controllers: [CyclesController],
  providers: [
    CyclesService,
    PrismaService,
    PlansService,
    DosService,
    ChecksService,
    ActionsService,
  ],
})
export class CyclesModule {}
