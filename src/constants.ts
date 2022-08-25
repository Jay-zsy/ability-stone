export const maxNumOfNodes = [ 6, 7, 8, 9, 10 ];

export type MaxNumOfNodes = 6 | 7 | 8 | 9 | 10;

export type RowType = 'ABILITY' | 'MALICE';

interface IRow {
  type: RowType;
  rowNumber: string;
  facets: Array<boolean>;
}

interface IRows extends Array<IRow>{}

export const rows: IRows = [
  { type: 'ABILITY', rowNumber: 'r1', facets: [] },
  { type: 'ABILITY', rowNumber: 'r2', facets: [] },
  { type: 'MALICE', rowNumber: 'r3', facets: [] },
];

export interface IFC {
  r1: boolean[],
  r2: boolean[],
  r3: boolean[],
  [key: string]: boolean[],
}

export type FacetHistory = Array<{ rowNumber: string, facet: boolean, pIndex: number }>;

export const probability = [ 0.75, 0.65, 0.55, 0.45, 0.35, 0.25 ];
