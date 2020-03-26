<template>
  <div @contextmenu.prevent="count+=1">
    <table class="table is-bordered">
      <tr>
        <th />
        <th v-for="j in width" :key="j">
          {{ columnIndications[j-1] }}
        </th>
      </tr>
      <tr
        v-for="(row, i) in state"
        :key="i"
      >
        <td>
          {{ lineIndications[i] }}
        </td>
        <td
          v-for="(cell, j) in row"
          :key="j"
          class="cell"
          :class="{'is-dark': cell === 1, 'is-danger': cell === 2}"
          @mousedown.left="isEditing = true; updateCell(i, j, 1)"
          @mouseup.left="isEditing = false"
          @mouseenter.left="isEditing && updateCell(i, j, 1)"
          @mouseup.right="cell === 0 ? updateCell(i, j, 2) : updateCell(i, j, 0)"
        >
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

  private state: number[][] = [];

  private isEditing = false;

  public lineIndication = (line: number[]) => {
    const accumulator: number[] = [];
    let count = 0;
    return line.reduce((acc, curr) => {
      if (curr === 1) {
        count += 1;
      } else if (count > 0) {
        acc.push(count);
        count = 0;
      }
      return acc;
    }, accumulator);
  }

  get lineIndications() {
    return this.state.map(this.lineIndication);
  }

  get columnIndications() {
    return [...Array(this.width).keys()]
      .map((columnIndex) => this.state.map((line) => line[columnIndex]))
      .map(this.lineIndication);
  }

  public created() {
    this.state = Array(this.height).fill(0).map(() => Array(this.width).fill(0).map(() => 0));
  }

  public updateCell(row: number, column: number, value: number) {
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
  padding: 0;
}
</style>
