<template>
  <div>
    <table
      @mouseleave="hoveredCell = {x: undefined, y: undefined};"
      @contextmenu.prevent=""
      class="board"
    >
      <tbody>
        <tr
          v-for="(row, i) in state"
          :key="i"
        >
          <cell
            v-for="(color, j) in row"
            :key="j"
            :color="color"
            :highlighted="i === hoveredCell.x || j === hoveredCell.y"
            :fat-borders="fatBorders(i,j)"
            @mouseenter.native="onEnter(i, j)"
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

interface Color {
  red: number;
  green: number;
  blue: number;
}

@Component({
  components: {
    Cell,
  },
})
export default class CreationGrid extends Vue {
  @Prop({
    required: true,
    type: Array,
  })
  model!: Color[][];

  public state: Color[][] = [];

  @Watch('model', {
    immediate: true,
  })
  onModelChange(value: Color[][]) {
    this.state = [];
    value.forEach((line) => {
      this.state.push([...line]);
    });
  }
  // Model infos

  public hoveredCell: {x?: number; y?: number} = {};

  // Additional styling

  public onEnter(row: number, column: number) {
    this.hoveredCell = { x: row, y: column };
  }

  public fatBorders = (row: number, column: number) => {
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
