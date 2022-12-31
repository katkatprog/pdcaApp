export interface CycleIfc {
  id: number;
  name: string;
  about: string | null;
  goal: string;
  userId: number;
  favorite: boolean;
  watchFromAnyone: boolean;
  erased: boolean;
  suspend: boolean;
}
