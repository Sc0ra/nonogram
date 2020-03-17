<template>
  <div id="app">
    <Grid :height="20" :width="20" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Grid from '@/components/Grid.vue';

@Component({
  components: {
    Grid,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "bulma";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
