export enum CellValue {
  Empty = 0,
  Fill,
  Flag,
  Error,
}

export interface Level {
  model: CellValue[][];
  max_health: number;
  level_id: string;
  name: string;
}

export interface LevelMap {
  [id: string]: Level;
}

export interface LevelState {
  levels: LevelMap;
}
