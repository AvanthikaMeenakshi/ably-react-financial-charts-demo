export type IOHLCData = {
  close: number;
  date: Date | string;
  high: number;
  low: number;
  open: number;
  volume: number;
}

export type IOHLCResponseData = {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: string;
  t: number[];
  v: number[];
}