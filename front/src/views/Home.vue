<template>
  <div>
    <h1 class="title is-1">
      Nonogram
    </h1>
    <img src="nonogram.png">
    <div class="home-item">
      <h3 class="title is-3">
        Current Levels
      </h3>
      <router-link
        v-for="level in levels"
        :key="level.level_id"
        :to="`/level/${level.level_id}`"
      >
        {{ level.name }}
      </router-link>
    </div>
    <div class="home-item">
      <h3 class="title is-3">
        Create your own levels
      </h3>
      <router-link to="/model-creator">
        With your owns images !
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { Level } from '../store/levels/types';

@Component
export default class App extends Vue {
  @Getter('getLevels', { namespace: 'levels' })
  levels!: Level[];
}
</script>

<style lang="scss">
.home-item {
  margin-top: 4rem;
}
</style>
