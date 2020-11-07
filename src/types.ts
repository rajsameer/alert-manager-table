import { FieldType } from '@grafana/data';

export interface SimpleOptions {
  text: string;
  timefield: FieldType.time;
  column_b: string;
  column_c: string;
  column_d: string;
}

export interface DisplayData {
  header: string;
  icon?: string;
  body: string;
  bodyDisplay: boolean;
  color: string;
}

export interface RowData {
  timeValue: string;
  colum_b_value: string;
  colum_c_value: string;
  colum_d_value: string;
  cardData: string;
  isCardDisaplyed: boolean;
  rowColor: string;
}
