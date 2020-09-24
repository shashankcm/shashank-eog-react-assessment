import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import MetricsDropDown from './MetricsDropDown';
import MetricsMeasurements from './MetricsMeasurements';
import Chart from './Chart';

import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import { getSelectedMetrics } from './redux/selectors';
import { actions } from './redux/measurementReducer';

const useStyles = makeStyles({
  chart__dropDown: {
    width: '60vw',
    margin: '0 auto',
    paddingTop: '10vh',
  },
});

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
      <ChartDashboard />
    </Provider>
  );
};

const ChartDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listOfMetrics = useSelector(getSelectedMetrics);
  const beforeThirtyMinutes = moment() - 30 * 60 * 1000;
  const [result] = useQuery(
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

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.measurementErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.initialMeasurementDataReceived(data));
  }, [dispatch, data, error]);

  return (
    <div>
      <div className={classes.chart__dropDown}>
        <MetricsDropDown />
      </div>
      <MetricsMeasurements />
      <Chart />
    </div>
  );
};
