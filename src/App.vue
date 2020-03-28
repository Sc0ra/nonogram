<template>
  <div id="app">
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
import { Component, Vue } from 'vue-property-decorator';
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
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');
html {
  background-color: #82d1cd;
}
#app {
  font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #17252a;
  margin-top: 60px;
}

.wrapper {
  display: inline-block;
  vertical-align: middle;
}
</style>
