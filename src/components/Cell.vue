<template>
  <td
    class="cell"
    :class="style(value)"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

enum CellValue {
    Empty = 0,
    Filled,
    Flagged,
    Error,
}

@Component
export default class Grid extends Vue {
  @Prop({
    required: true,
    type: Number,
  })
  value!: CellValue;

  public style = (cell: CellValue) => ({
    'is-selected': cell === CellValue.Filled,
    'is-flagged': cell === CellValue.Flagged,
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
  &.is-selected {
    background-color: #17252a;
  }
  &.is-flagged {
    background-color: #2b7a78;
  }
  &.is-error {
    background-color: #db6c84;
  }
}
</style>
