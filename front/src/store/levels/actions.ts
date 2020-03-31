import { ActionTree } from 'vuex';

import { LevelState, Level } from './types';
import { RootState } from '../types';
import { api } from '../api';
import normalize from './normalizer';

const actions: ActionTree<LevelState, RootState> = {
  getLevels({ commit }): void {
    api.get('levels').then((res) => {
      const levelList: Level[] = res && res.data;
      commit('setLevels', normalize(levelList));
    });
  },
};
export default actions;
