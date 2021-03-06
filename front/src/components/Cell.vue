<template>
  <td
    :class="classes"
    :style="customColor"
    class="cell"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { CellValue } from '@/store/types';

@Component
export default class Cell extends Vue {
  @Prop({
    required: false,
    type: Number,
    default: CellValue.Empty,
  })
  value?: CellValue;

  @Prop({
    required: true,
    type: Boolean,
  })
  highlighted!: boolean;

  @Prop({
    required: true,
    type: Array,
  })
  fatBorders!: string[];

  @Prop({
    required: false,
    type: Object,
  })
  color?: { red: number; green: number; blue: number};

  get classes() {
    return {
      'is-fill': this.value === CellValue.Fill,
      'is-flag': this.value === CellValue.Flag,
      'is-error': this.value === CellValue.Error,
      'is-highlight': this.highlighted,
      left: this.fatBorders.includes('left'),
      right: this.fatBorders.includes('right'),
      top: this.fatBorders.includes('top'),
      bottom: this.fatBorders.includes('bottom'),
    };
  }

  get customColor() {
    return this.color
      ? {
        'background-color': `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`,
      }
      : '';
  }
}
</script>

<style scoped lang="scss">
.cell {
  height: 1.5rem;
  width: 1.5rem;
  padding: 0;
  border: solid #def2f1 2px;
  &.is-highlight {
    background-color: #9fd8d5;
  }
  &.is-fill {
    background-color: #17252a;
  }
  &.is-flag {
    background-color: #2b7a78;
  }
  &.is-error {
    background-color: #db6c84;
  }
  &.left {
    border-left: solid #def2f1 4px;
  }
  &.right {
    border-right: solid #def2f1 4px;
  }
  &.top {
    border-top: solid #def2f1 4px;
  }
  &.bottom {
    border-bottom: solid #def2f1 4px;
  }
 }
</style>
