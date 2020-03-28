<template>
  <div>
    <table
      @mousedown.left="isEditing = true"
      @mouseup.left="isEditing = false"
      @mouseleave="isEditing = false"
      @contextmenu.prevent=""
    >
      <tbody>
        <tr>
          <td />
          <td
            v-for="j in width"
            :key="j"
            class="column-hint"
          >
            <div
              v-for="(hint, k) in columnHints[j-1]"
              :key="k"
              class="hint"
            >
              {{ hint }}
            </div>
          </td>
        </tr>
        <tr
          v-for="(row, i) in state"
          :key="i"
        >
          <td class="line-hint">
            <span
              v-for="(hint, k) in rowHints[i]"
              :key="k"
              class="hint"
            >
              {{ hint }}
            </span>
          </td>
          <cell
            v-for="(cell, j) in row"
            :key="j"
            :value="cell"
            @mousedown.native.left.prevent="onLeftClick(i, j)"
            @mouseover.native.left="onNewCellEnter(i, j)"
            @mouseup.native.right="onRightClick(i, j)"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

import Cell from '@/components/Cell.vue';

enum CellValue {
    Empty = 0,
    Filled,
    Flagged,
    Error,
}

@Component({
  components: {
    Cell,
  },
})
export default class Grid extends Vue {
  // Model infos

  @Prop({
    required: true,
    type: Array,
  })
  model!: CellValue[][];

  get heigth() {
    return this.model && this.model.length;
  }

  get width() {
    return this.model && this.model[0].length;
  }

  // Hints generation

  public rowToHints = (line: number[]) => {
    let accumulator: number[] = [];
    let count = 0;
    accumulator = line.reduce((acc, curr) => {
      if (curr === 1) {
        count += 1;
      } else if (count > 0) {
        acc.push(count);
        count = 0;
      }
      return acc;
    }, accumulator);
    if (count !== 0) {
      accumulator.push(count);
    }
    return accumulator;
  }

  get columnHints() {
    return [...Array(this.model[0].length).keys()]
      .map((columnIndex) => this.model.map((line) => line[columnIndex]))
      .map(this.rowToHints);
  }

  get rowHints() {
    return this.model.map(this.rowToHints);
  }

  // State and init

  private state: CellValue[][] = [];

  public created() {
    this.state = Array(this.heigth)
      .fill(CellValue.Empty).map(() => Array(this.width)
        .fill(CellValue.Empty).map(() => CellValue.Empty));
  }

  // Play actions

  private isEditing = false;

  public updateCell(row: number, column: number, value: CellValue) {
    const newRow = this.state[row];
    newRow[column] = value;
    this.state.splice(row, 1, newRow);
  }

  public selectCell(row: number, column: number) {
    if (this.model[row][column] === CellValue.Filled) {
      this.updateCell(row, column, CellValue.Filled);
    } else if (this.state[row][column] === CellValue.Empty) {
      this.updateCell(row, column, CellValue.Error);
      this.$emit('error');
      this.isEditing = false;
    }
  }

  public onRightClick(row: number, column: number) {
    const cell = this.state[row][column];
    if (cell === CellValue.Empty) {
      this.updateCell(row, column, CellValue.Flagged);
    } else {
      this.updateCell(row, column, CellValue.Empty);
    }
  }

  public onLeftClick(row: number, column: number) {
    this.isEditing = true;
    this.selectCell(row, column);
  }

  public onNewCellEnter(row: number, column: number) {
    if (this.isEditing) {
      this.selectCell(row, column);
    }
  }

  // Success

  private successCell(row: number, column: number, cell: CellValue) {
    return this.model[row][column] !== CellValue.Filled || cell === this.model[row][column];
  }

  get success() {
    return this.state
      .every((row, i) => row
        .every((cell, j) => this.successCell(i, j, cell)));
  }

  @Watch('success')
  public onSuccess(value: boolean) {
    if (value) {
      this.$emit('success');
    }
  }
}
</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;
  margin-right: 14rem;
}

.line-hint {
  width: 14rem;
  text-align: right;
  padding-right: 1rem;
}
.column-hint {
  height: 14rem;
  vertical-align: bottom;
  padding-bottom: 1rem;
  text-align: center;
}

.hint {
  text-align: center;
  font-weight: 600;
}
</style>
