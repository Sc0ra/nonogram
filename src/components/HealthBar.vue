<template>
  <div class="health-bar">
    <span
      v-for="error in maxHealth"
      :key="error"
      class="icon is-large"
    >
      <i
        class="fa-heart is-error fa-2x"
        :class="error <= currentHealth ? 'far' : 'fas'"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HealthBar extends Vue {
  @Prop({
    required: true,
    type: Number,
  })
  maxHealth!: number;

  @Prop({
    required: true,
    type: Number,
  })
  currentHealth!: number;
}
</script>

<style scoped lang="scss">
.health-bar {
  display: inline-block;
  direction: rtl;
}
.is-error {
  color: #db6c84;
}
</style>
