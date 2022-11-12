export interface CycleIfc {
  id: number;
  name: string;
  about: string;
  goal: string;
  userId: number;
  favorite: boolean;
  watchFromAnyone: boolean;
  erased: boolean;
  currentRound: number;
  suspend: boolean;
}
