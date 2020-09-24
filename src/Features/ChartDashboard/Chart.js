import React, { useCallback, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import moment from 'moment';
import { generateChartData, getSelectedMetrics } from './redux/selectors';
import { actions } from './redux/measurementReducer';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const MultipleMeasurementsQuery = `
query($input: [MeasurementQuery]){
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      metric
      at
      value
      unit
    }
  }
}
`;

export default () => {
  return (
    <Provider value={client}>
      <Chart />
    </Provider>
  );
};

const Chart = () => {
  const { chartData, measurements } = useSelector(generateChartData);
  const dispatch = useDispatch();
  const listOfMetrics = useSelector(getSelectedMetrics);
  const beforeThirtyMinutes = moment() - 30 * 60 * 1000;

  const [initialThirtyMinutesMeasurementsData] = useQuery(
    {
      query: MultipleMeasurementsQuery,
      variables: {
        input: listOfMetrics.map(metric => ({
          metricName: metric.label,
          after: beforeThirtyMinutes,
        })),
      },
    },
    [listOfMetrics],
  );

  const { fetching, data, error } = initialThirtyMinutesMeasurementsData;

  const getInitialThirtyMinutesMeasurementsData = useCallback(
    measurementData => dispatch(actions.initialMeasurementDataReceived(measurementData)),
    [dispatch],
  );

  const getInitialThirtyMinutesMeasurementApiError = useCallback(
    apiError => dispatch(actions.measurementErrorReceived({ error: apiError.message })),
    [dispatch],
  );

  useEffect(() => {
    if (!data) return;
    getInitialThirtyMinutesMeasurementsData(data);
  }, [data, getInitialThirtyMinutesMeasurementsData]);

  useEffect(() => {
    if (error) {
      getInitialThirtyMinutesMeasurementApiError(error);
      return;
    }
  }, [error, getInitialThirtyMinutesMeasurementApiError]);

  const getTickFormatter = tick => moment(tick).format('h:mm:ss a');
  const getFormattedTickLabel = tick => moment(tick).format('MMMM DD YYYY, h:mm:ss a');
  const currentTime = moment().valueOf();
  const currentStrokValue = Array(6)
    .fill(null)
    .map((_notUsedValue, index) => currentTime - (30 * 60 * 1000 * (index + 1)) / 6);

  const colors = ['#386fcc', '#9ae10f', '#6f2a44', '#a73125', '#e03eb2', '#53330e'];

  if (!fetching) return null;

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
            label={{
              value: measurement.currentMeasurementUnit,
              angle: -90,
              position: 'insideLeft',
            }}
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
