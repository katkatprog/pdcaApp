import { Injectable } from '@nestjs/common';
import { CycleIfc } from './cycle.interface';

@Injectable()
export class CyclesService {
  private cycles: CycleIfc[] = [
    {
      id: 1,
      name: '起床時間改善',
      about: '早起きできるようにする',
      goal: '毎朝6:30起床',
      userId: 1,
      favorite: false,
      watchFromAnyone: false,
      erased: false,
      currentRound: 1,
      suspend: false,
    },
  ];

  findAll() {
    return this.cycles;
  }

  findById(id: number) {
    // Paramsで取得した値はstringとなってしまうので、numberに変換
    // 後でバリデーションを実装したら直す
    const cycle = this.cycles.filter((ele) => ele.id === Number(id));
    return cycle;
  }
}
