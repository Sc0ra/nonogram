<template>
  <div>
    <h1 class="title is-1">
      Nonogram
    </h1>
    <router-link :to="{path:'/level/1'}">
      Level 1
    </router-link>
    <router-link :to="{path:'/level/2'}">
      Level 2
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
}
</script>

<style lang="scss">

</style>
