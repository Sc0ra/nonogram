<template>
<div class="error-bar">
  <span v-for="error in maxErrorCount" class="icon" :key="error">
    <i
      class="fa-heart is-error"
      :class="error <= currentErrorCount ? 'far' : 'fas'"
    />
  </span>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ErrorsBar extends Vue {
  @Prop({
    required: true,
    type: Number,
  })
  maxErrorCount!: number;

  @Prop({
    required: true,
    type: Number,
  })
  currentErrorCount!: number;
}
</script>

<style scoped lang="scss">
.error-bar {
  display: inline-block;
  direction: rtl;
}
.icon {
  padding: .2rem;
  font-size: 1.5rem;
}
.is-error {
  color: #db6c84;
}
</style>
