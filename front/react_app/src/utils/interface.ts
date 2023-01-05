export interface EditCycleIfc {
  name: string;
  about: string | null;
  goal: string;
  watchFromAnyone: boolean;
  suspend: boolean;
}

export interface EditTaskIfc {
  name: string;
  about: string | null;
  startDate: Date | null;
  endDate: Date | null;
}
