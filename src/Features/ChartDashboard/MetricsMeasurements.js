import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useSubscription, defaultExchanges, subscriptionExchange } from 'urql';

import Metrics from './Metrics';

import { getSelectedMetrics } from './redux/selectors';
import { actions } from './redux/measurementReducer';

const useStyles = makeStyles({
  chart__metrics: {
    padding: '2rem',
  },
});

const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});

const MeasurementSubscription = `
    subscription newMeasurement {
      newMeasurement{
        metric 
        at
        value
        unit 
      }
    }
`;

const MetricsMeasurements = () => {
  const classes = useStyles();
  const metrics = useSelector(getSelectedMetrics);
  const dispatch = useDispatch();
  const [newMeasurementResponse] = useSubscription({
    query: MeasurementSubscription,
  });
  const { data, error } = newMeasurementResponse;

  useEffect(() => {
    if (error) {
      dispatch(actions.measurementErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.measurementDataReceived(data));
  }, [dispatch, data, error]);

  return (
    <div className={classes.chart__metrics}>
      <Grid container direction="row" spacing={3}>
        {metrics.map((metric, index) => (
          <Metrics key={index} metric={metric} />
        ))}
      </Grid>
    </div>
  );
};

export default () => {
  return (
    <Provider value={client}>
      <MetricsMeasurements />
    </Provider>
  );
};
