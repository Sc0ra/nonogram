import { MutationTree } from 'vuex';
import { LevelState, LevelMap } from './types';

const mutations: MutationTree<LevelState> = {
  setLevels(state, levels: LevelMap) {
    state.levels = levels;
  },
};
export default mutations;
