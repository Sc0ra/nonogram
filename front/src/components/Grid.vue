<template>
  <div>
    <table
      @mouseup.left="isEditing = false"
      @mouseleave="isEditing = false; hoveredCell = {x: undefined, y: undefined};"
      @contextmenu.prevent=""
      class="board"
    >
      <tbody>
        <tr>
          <td />
          <td
            v-for="j in width"
            :key="j-1"
            class="column-hint"
          >
            <div
              v-for="(hint, k) in columnHints[j-1]"
              :key="k"
              :class="{'success-hint': successColumn(j-1)}"
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
              :class="{'success-hint': successLine(i)}"
              class="hint"
            >
              {{ hint }}
            </span>
          </td>
          <cell
            v-for="(cell, j) in row"
            :key="j"
            :value="cell"
            :highlighted="i === hoveredCell.x || j === hoveredCell.y"
            :fat-borders="fatBorders(i,j)"
            @mouseenter.native="onEnter(i, j)"
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

import { CellValue } from '../store/types';

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

  hoveredCell: {x?: number; y?: number} = {};

  // Hints generation

  rowToHints = (line: number[]) => {
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

  state: CellValue[][] = [];

  created() {
    this.state = Array(this.heigth)
      .fill(CellValue.Empty).map(() => Array(this.width)
        .fill(CellValue.Empty).map(() => CellValue.Empty));
  }

  // Play actions

  isEditing = false;

  updateCell(row: number, column: number, value: CellValue) {
    const newRow = this.state[row];
    newRow[column] = value;
    this.state.splice(row, 1, newRow);
  }

  selectCell(row: number, column: number) {
    if (this.model[row][column] === CellValue.Fill) {
      this.updateCell(row, column, CellValue.Fill);
    } else if (this.state[row][column] === CellValue.Empty) {
      this.updateCell(row, column, CellValue.Error);
      this.$emit('error');
      this.isEditing = false;
    }
  }

  onRightClick(row: number, column: number) {
    const cell = this.state[row][column];
    if (cell === CellValue.Empty) {
      this.updateCell(row, column, CellValue.Flag);
    } else {
      this.updateCell(row, column, CellValue.Empty);
    }
  }

  onLeftClick(row: number, column: number) {
    this.isEditing = true;
    this.selectCell(row, column);
  }

  onNewCellEnter(row: number, column: number) {
    if (this.isEditing) {
      this.selectCell(row, column);
    }
  }

  // Success

  successCell(row: number, column: number, cell: CellValue) {
    return this.model[row][column] !== CellValue.Fill || cell === this.model[row][column];
  }

  successColumn(column: number) {
    return this.state
      .every((row, i) => this.successCell(i, column, row[column]));
  }

  successLine(row: number) {
    return this.state[row]
      .every((cell, j) => this.successCell(row, j, cell));
  }

  get success() {
    return this.state
      .every((row, i) => this.successLine(i));
  }

  @Watch('success')
  onSuccess(value: boolean) {
    if (value) {
      this.isEditing = false;
      this.$emit('success');
    }
  }

  // Additional styling

  onEnter(row: number, column: number) {
    this.hoveredCell = { x: row, y: column };
  }

  fatBorders = (row: number, column: number) => {
    const borders: string[] = [];
    if (row % 5 === 0) {
      borders.push('top');
    } else if (row % 5 === 4) {
      borders.push('bottom');
    }
    if (column % 5 === 0) {
      borders.push('left');
    } else if (column % 5 === 4) {
      borders.push('right');
    }
    return borders;
  }
}
</script>

<style scoped lang="scss">
.board {
  border-collapse: collapse;
}

.line-hint {
  text-align: right;
  padding-right: 1rem;
}
.column-hint {
  vertical-align: bottom;
  padding-bottom: 1rem;
  text-align: center;
}

.hint {
  text-align: center;
  font-weight: 600;

  &.success-hint {
    color: #76bdb9;
  }
}
</style>
