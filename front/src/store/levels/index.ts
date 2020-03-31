import { Module } from 'vuex';
import { LevelState } from './types';
import { RootState } from '../types';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const state: LevelState = {
  levels: {},
};

const namespaced = true;

export const levels: Module<LevelState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
