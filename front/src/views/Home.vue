<template>
  <div>
    <h1 class="title is-1">
      Nonogram
    </h1>
    <router-link
      v-for="level in levels"
      :to="`/level/${level.level_id}`"
      :key="level.level_id"
    >
      {{ level.name }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { Level } from '../store/levels/types';

@Component
export default class App extends Vue {
@Getter('getLevels', { namespace: 'levels' })
public levels!: Level[];
}
</script>

<style lang="scss">

</style>
