<template>
  <div @contextmenu.prevent="count+=1">
    <table class="table is-bordered">
      <tr
        v-for="(row, i) in state"
        :key="i"
      >
        <td
          v-for="(cell, j) in row"
          :key="j"
          class="cell"
          @click="updateCell(i, j, 'selected')"
        >
        {{ cell }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Grid extends Vue {
  @Prop({
    required: true,
    type: Number,
  })
  height!: number;

  @Prop({
    required: true,
    type: Number,
  })
  width!: number;

  private state: string[][] = [];

  public created() {
    this.state = Array(this.height).fill('').map(() => Array(this.width).fill('').map(() => ''));
  }

  public updateCell(row: number, column: number, value: string) {
    console.log(row);
    console.log(column);
    console.log(value);
    const newRow = this.state[row];
    newRow[column] = value;
    this.state.splice(row, 1, newRow);
  }

  private count = 0;
}
</script>

<style scoped lang="scss">
.cell {
  height: 30px;
  width: 30px;
  & .selected {
    background-color: black;
  }
}
</style>
