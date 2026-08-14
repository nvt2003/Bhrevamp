import * as migration_20260812_091147 from './20260812_091147';
import * as migration_20260813_071423_more_global from './20260813_071423_more_global';
import * as migration_20260814_045748_updateAdsConfig from './20260814_045748_updateAdsConfig';

export const migrations = [
  {
    up: migration_20260812_091147.up,
    down: migration_20260812_091147.down,
    name: '20260812_091147',
  },
  {
    up: migration_20260813_071423_more_global.up,
    down: migration_20260813_071423_more_global.down,
    name: '20260813_071423_more_global',
  },
  {
    up: migration_20260814_045748_updateAdsConfig.up,
    down: migration_20260814_045748_updateAdsConfig.down,
    name: '20260814_045748_updateAdsConfig'
  },
];
