<template>
  <div id="app">
    <router-view class="main" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
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
</style>
