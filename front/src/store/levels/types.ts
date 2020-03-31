export enum CellValue {
  Empty = 0,
  Fill,
  Flag,
  Error,
}

export interface Level {
  model: CellValue[][];
  maxHealth: number;
  id: string;
}

export interface LevelMap {
  [id: string]: Level;
}

export interface LevelState {
  levels: LevelMap;
}
