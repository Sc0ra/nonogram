
import { Level, LevelMap } from './types';

const normalize = (levelList: Level[]) => levelList.reduce(
  (levels: LevelMap, level: Level) => ({
    ...levels,
    [level.id]: level,
  }),
  {},
);

export default normalize;
