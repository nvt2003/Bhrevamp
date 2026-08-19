import * as migration_20260814_062526 from './20260814_062526';
import * as migration_20260819_021049 from './20260819_021049';

export const migrations = [
  {
    up: migration_20260814_062526.up,
    down: migration_20260814_062526.down,
    name: '20260814_062526',
  },
  {
    up: migration_20260819_021049.up,
    down: migration_20260819_021049.down,
    name: '20260819_021049'
  },
];
