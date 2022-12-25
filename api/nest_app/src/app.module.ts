import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CyclesModule } from './cycles/cycles.module';
import { PrismaService } from './prisma/prisma.service';
import { PlansModule } from './plans/plans.module';
import { DosModule } from './dos/dos.module';
import { ChecksModule } from './checks/checks.module';
import { ActionsModule } from './actions/actions.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    CyclesModule,
    PlansModule,
    DosModule,
    ChecksModule,
    ActionsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
