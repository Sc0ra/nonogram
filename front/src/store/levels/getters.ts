
import { GetterTree } from 'vuex';
import { LevelState } from './types';
import { RootState, Level } from '../types';

const getters: GetterTree<LevelState, RootState> = {
  getLevel(state) {
    return (levelId: string): Level => state.levels[levelId];
  },
  getLevels(state) {
    return Object.values(state.levels);
  },
};
export default getters;
