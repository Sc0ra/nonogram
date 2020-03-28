<template>
  <div class="level">
    <h1>Nonogram</h1>
    <div class="wrapper">
      <h2 v-if="success">
        Congratulations !!
      </h2>
      <template v-else>
        <errors-bar
          :max-error-count="maxErrorCount"
          :current-error-count="currentErrorCount"
        />
        <grid
          :model="model"
          @error="currentErrorCount++"
          @success="success = true"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import Grid from '@/components/Grid.vue';
import ErrorsBar from '@/components/ErrorsBar.vue';

enum CellValue {
    Empty = 0,
    Filled,
    Flagged,
    Error,
}

@Component({
  components: {
    Grid,
    ErrorsBar,
  },
})
export default class App extends Vue {
  @Prop({
    required: true,
    type: String,
  })
  levelIdText!: string;

  get levelId() {
    return +this.levelIdText;
  }

  public model: CellValue[][] = [
    [0, 1, 1, 0],
    [1, 1, 1, 1],
    [1, 0, 1, 1],
    [0, 1, 1, 0],
  ];

  public currentErrorCount = 0;

  public maxErrorCount = 3;

  public success = false;
}
</script>

<style lang="scss">
.wrapper {
  display: inline-block;
  vertical-align: middle;
}
</style>
