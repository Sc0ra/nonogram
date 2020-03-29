<template>
  <td
    class="cell"
    :class="style(value)"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { CellValue } from '@/store/types';

@Component
export default class Grid extends Vue {
  @Prop({
    required: true,
    type: Number,
  })
  value!: CellValue;

  public style = (cell: CellValue) => ({
    'is-fill': cell === CellValue.Fill,
    'is-flag': cell === CellValue.Flag,
    'is-error': cell === CellValue.Error,
  });
}
</script>

<style scoped lang="scss">
.cell {
  height: 1.5rem;
  width: 1.5rem;
  padding: 0;
  border: solid #def2f1 2px;
  &.is-fill {
    background-color: #17252a;
  }
  &.is-flag {
    background-color: #2b7a78;
  }
  &.is-error {
    background-color: #db6c84;
  }
}
</style>
