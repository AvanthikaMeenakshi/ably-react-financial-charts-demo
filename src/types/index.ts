// Represents a single data point for rendering a financial chart
export type IOHLCData = {
  close: number;       // Closing price of the financial instrument
  date: Date | string; // Date of the data point (can be either a JavaScript Date object or a string)
  high: number;        // Highest price during the time period
  low: number;         // Lowest price during the time period
  open: number;        // Opening price of the financial instrument
  volume: number;      // Volume of the financial instrument traded during the time period
}

// Represents the response data format received from the server
export type IOHLCResponseData = {
  c: number[];      // Array of closing prices for each data point
  h: number[];      // Array of highest prices for each data point
  l: number[];      // Array of lowest prices for each data point
  o: number[];      // Array of opening prices for each data point
  s: string;        // Status of the response. This field can either be ok or no_data.
  t: number[];      // Array of timestamps for each data point
  v: number[];      // Array of volumes for each data point
}
