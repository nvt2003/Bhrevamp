import * as migration_20261026_130119 from './20261026_130119';
import * as migration_20261028_052734 from './20261028_052734';

export const migrations = [
  {
    up: migration_20261026_130119.up,
    down: migration_20261026_130119.down,
    name: '20261026_130119',
  },
  {
    up: migration_20261028_052734.up,
    down: migration_20261028_052734.down,
    name: '20261028_052734'
  },
];
