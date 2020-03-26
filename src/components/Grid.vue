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
          :class="{'is-dark': cell === 'selected'}"
          @mousedown="isEditing = true; updateCell(i, j, 'selected')"
          @mouseup="isEditing = false"
          @mouseenter="isEditing && updateCell(i, j, 'selected')"
          @contextmenu.prevent="updateCell(i, j, 'flagged')"
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

  private state: string[][] = [];

  private isEditing = false;

  public created() {
    this.state = Array(this.height).fill('').map(() => Array(this.width).fill('').map(() => ''));
  }

  public updateCell(row: number, column: number, value: string) {
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
