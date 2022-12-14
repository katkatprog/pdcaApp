import { Cycle, PrismaClient, Task } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

// cycleの初期データ
const cycleData: Cycle = {
  id: 1,
  name: '生活習慣改善',
  about: '生活習慣を改善し、良い生活リズムを実現する',
  goal: '6時起床、11時就寝',
  erased: false,
  favorite: false,
  suspend: false,
  userId: 1,
  watchFromAnyone: false,
};

// taskの初期データ
const taskData: Task[] = [
  {
    id: 1,
    name: 'task1',
    about: 'task1task1',
    cycleId: 1,
    complete: false,
    round: 3,
    startDate: null,
    endDate: null,
  },
  {
    id: 2,
    name: 'task2',
    about: 'task2task2',
    cycleId: 1,
    complete: false,
    round: 3,
    startDate: null,
    endDate: null,
  },
];

const main = async () => {
  // cycleデータの投入
  await prisma.cycle.create({ data: cycleData });

  // p,d,c,aデータの作成
  for (let i = 1; i <= 3; i++) {
    await axios.post(`http://localhost:3000/cycles/create-pdca/1/${i}`);
  }

  // taskデータの投入
  for (const task of taskData) {
    await prisma.task.create({ data: task });
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
