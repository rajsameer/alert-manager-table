type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}

export interface DisplayData {
  header: string;
  icon?: string;
  body: string;
  bodyDisplay: boolean;
  color: string;
}