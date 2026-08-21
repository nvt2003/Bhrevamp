import * as migration_20260819_023347 from './20260819_023347';
import * as migration_20260819_045020 from './20260819_045020';

export const migrations = [
  {
    up: migration_20260819_023347.up,
    down: migration_20260819_023347.down,
    name: '20260819_023347',
  },
  {
    up: migration_20260819_045020.up,
    down: migration_20260819_045020.down,
    name: '20260819_045020'
  },
];
