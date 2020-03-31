
import { GetterTree } from 'vuex';
import { ModelsState } from './types';
import { RootState, Level } from '../types';

const getters: GetterTree<ModelsState, RootState> = {
  getLevel(state) {
    return (levelId: string): Level => state[levelId];
  },
};
export default getters;
