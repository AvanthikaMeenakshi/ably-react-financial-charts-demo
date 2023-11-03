import React, { useState, useEffect } from 'react';
import { timeFormat, timeParse } from 'd3-time-format';
import { format } from "d3-format";
import { ChartCanvas, Chart, discontinuousTimeScaleProviderBuilder, AreaSeries,  XAxis, YAxis, ToolTipText, lastVisibleItemBasedZoomAnchor, CrossHairCursor, MouseCoordinateY, MouseCoordinateX, OHLCTooltip, EdgeIndicator } from 'react-financial-charts'
import useWindowSize from './hooks/useWindowSize';

type IOHLCData = {
  close: number;
  date: Date | string;
  high: number;
  low: number;
  open: number;
  volume: number;
}

type IOHLCResponseData = {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: string;
  t: number[];
  v: number[];
}

const displayTimeFormat = '%Y-%m-%d %H-%M'
const xAxisTimeDisplayFormat = '%d %b'
const yAxisTimeDisplayFormat = '.2f'

const parseDate = (dateString: Date) => {
  const parsedDate = timeFormat(displayTimeFormat)(dateString);
  console.log(parsedDate)
  if (parsedDate) {
    return parsedDate;
  } else {
    return new Date(); // Default date
  }
};

const processData = (data: IOHLCResponseData): IOHLCData[] => {
  const chartData: IOHLCData[] = []
  if (data.s === 'ok') {
    data.t.forEach((val, index) => {
      const timeStamp = new Date(val * 1000)
      const formattedDate = parseDate(new Date(timeStamp))
      chartData.push({
        close: data.c[index],
        date: formattedDate,
        high: data.h[index],
        low: data.l[index],
        open: data.o[index],
        volume: data.v[index],
      })
    })
  }
  return chartData
}

const AreaChart = () => {
  const margin = { left: 50, right: 50, top: 30, bottom: 30 }
  const { width, height } = useWindowSize()
  const [areaChartData, setAreaChartData] = useState<IOHLCData[]>([])
  const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d: IOHLCData) => timeParse(displayTimeFormat)(d.date as unknown as string) || new Date(),
  );

  useEffect(() => {
    fetch('/api/ohlc/AAPL').then(res => res.json()).then((data: IOHLCResponseData) => {
      setAreaChartData(processData(data))
    }).catch(err => {
      console.log(err)
    })
  }, [])

  if (areaChartData.length === 0) {
    return null
  }
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(areaChartData);
  const pricesDisplayFormat = format(yAxisTimeDisplayFormat);
  const timeDisplayFormat = timeFormat(xAxisTimeDisplayFormat)
  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min,  max];
  const yAccessor = (data: IOHLCData) => {
    return data.close;
  };

  const yExtents = (data: IOHLCData) => {
    return [data.high, data.low];
  };

  const openCloseColor = (data: IOHLCData) => {
    return data.close > data.open ? "#26a69a" : "#ef5350";
  };

  const yEdgeIndicator = (data: IOHLCData) => {
    return data.close;
  };

  return (
    <div>
      <ChartCanvas
        height={height}
        width={width}
        ratio={1}
        margin={margin}
        data={data}
        xScale={xScale}
        xExtents={xExtents}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        seriesName="OHLC Chart"
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart id={0} yExtents={yExtents}>
          <XAxis showGridLines  />
          <YAxis showGridLines tickFormat={pricesDisplayFormat} />
          <AreaSeries yAccessor={yAccessor} />
          <ToolTipText />
          <CrossHairCursor />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={pricesDisplayFormat}
          />
          <MouseCoordinateX
            rectWidth={margin.bottom}
            displayFormat={timeDisplayFormat}
          />
          <OHLCTooltip origin={[8, 16]} />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={openCloseColor}
            lineStroke={openCloseColor}
            displayFormat={pricesDisplayFormat}
            yAccessor={yEdgeIndicator}
          />
        </Chart>
      </ChartCanvas>
    </div>
  );
}

export default AreaChart