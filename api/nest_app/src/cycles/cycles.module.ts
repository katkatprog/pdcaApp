import { Module } from '@nestjs/common';
import { CyclesController } from './cycles.controller';
import { CyclesService } from './cycles.service';

@Module({
  controllers: [CyclesController],
  providers: [CyclesService],
})
export class CyclesModule {}
