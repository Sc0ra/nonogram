<template>
  <div v-if="level">
    <h1 class="title is-1">
      Nonogram
    </h1>
    <div class="wrapper">
      <h2 v-if="success">
        Congratulations !!
      </h2>
      <health-bar
        v-else
        :max-health="level.max_health"
        :current-health="currentHealth"
      />
      <grid
        :model="level.model"
        @error="currentHealth++"
        @success="success = true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import Grid from '@/components/Grid.vue';
import HealthBar from '@/components/HealthBar.vue';

import { Level } from '../store/levels/types';

@Component({
  components: {
    Grid,
    HealthBar,
  },
})
export default class App extends Vue {
  @Prop({
    required: true,
    type: String,
  })
  levelId!: string;

  @Getter('getLevel', { namespace: 'levels' })
  public getLevel!: (levelId: string) => Level;

  get level() {
    return this.getLevel(this.levelId);
  }

  public currentHealth = 0;

  public success = false;
}
</script>

<style lang="scss">
.wrapper {
  display: inline-block;
  vertical-align: middle;
}
</style>
