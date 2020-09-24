import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { generateChartData } from './redux/selectors';

const Chart = () => {
  const { chartData, measurements, selectedMetrics } = useSelector(generateChartData); //generateChartData
  const getTickFormatter = tick => moment(tick).format('h:mm:ss a');
  const getFormattedTickLabel = tick => moment(tick).format('MMMM DD YYYY, h:mm:ss a');
  const currentTime = moment().valueOf();
  const currentStrokValue = Array(6)
    .fill(null)
    .map((_, index) => currentTime - (30 * 60 * 1000 * (index + 1)) / 6);

  const colors = ['#386fcc', '#9ae10f', '#6f2a44', '#a73125', '#e03eb2', '#53330e'];
  return (
    <LineChart width={1000} height={500} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis
        dataKey="time"
        name="Date"
        scale="time"
        type="number"
        tickFormatter={getTickFormatter}
        ticks={currentStrokValue}
        domain={[currentTime - 30 * 60 * 1000, currentTime]}
      />
      {measurements.map(measurement => {
        return (
          <YAxis
            key={measurement.metric}
            dataKey={measurement.metric}
            yAxisId={measurement.metric}
            padding={{ top: 10, bottom: 0 }}
            label={measurement.currentMeasurementUnit}
          />
        );
      })}
      <Tooltip labelFormatter={getFormattedTickLabel} />
      <Legend />
      {measurements.map((measurement, index) => {
        return (
          <Line
            isAnimationActive={true}
            key={measurement.metric}
            yAxisId={measurement.metric}
            dataKey={measurement.metric}
            label={measurement.currentMeasurementUnit}
            stroke={colors[index]}
            dot={true}
          />
        );
      })}
    </LineChart>
  );
};

export default Chart;
