import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { RootState } from './types';
import { levels } from './levels';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    levels,
  },
};

export default new Vuex.Store<RootState>(store);
