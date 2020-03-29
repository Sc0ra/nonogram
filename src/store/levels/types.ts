export enum CellValue {
  Empty = 0,
  Fill,
  Flag,
  Error,
}

export interface Level {
  model: CellValue[][];
  maxHealth: number;
}

export interface ModelsState {
  [key: string]: Level;
}
