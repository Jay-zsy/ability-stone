export const maxNumOfNodes = [ 6, 7, 8, 9, 10 ];

export type MaxNumOfNodes = 6 | 7 | 8 | 9 | 10;

export type RowType = 'ABILITY' | 'MALICE';

interface IRow {
  type: RowType;
  rowNumber: number;
  facets: Array<boolean>;
}

interface IRows extends Array<IRow>{}

export const rows: IRows = [
  { type: 'ABILITY', rowNumber: 1, facets: [] },
  { type: 'ABILITY', rowNumber: 2, facets: [] },
  { type: 'MALICE', rowNumber: 3, facets: [] },
];

export interface IFC {
  r1: boolean[],
  r2: boolean[],
  r3: boolean[],
}

export type FacetHistory = Array<{ rowNumber: number, facet: boolean }>;
