import { Module } from 'vuex';
import { ModelsState } from './types';
import { RootState } from '../types';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const state: ModelsState = {
  1: {
    model: [
      [0, 1, 1, 0],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [0, 1, 1, 0],
    ],
    maxHealth: 3,
  },
  2: {
    model: [
      [0, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1],
      [0, 1, 1, 0, 1, 1],
    ],
    maxHealth: 3,
  },
};

const namespaced = true;

export const levels: Module<ModelsState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
