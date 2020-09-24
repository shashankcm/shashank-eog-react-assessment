import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Provider, createClient, useQuery } from 'urql';

import { actions as metricActions } from './redux/metricsReducer';

const animatedComponents = makeAnimated();

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const MetricsQuery = `
  query {
    getMetrics
  }
`;

const MetricsDropDown = () => {
  const [result] = useQuery({
    query: MetricsQuery,
  });
  const dispatch = useDispatch();
  const [metrics, setMetrics] = useState([]);

  const { data, error, fetching } = result;

  useEffect(() => {
    if (error) {
      dispatch(metricActions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;

    const listOfMetrics = getMetrics.map(metric => ({
      label: metric,
      value: metric,
    }));

    setMetrics(listOfMetrics);
  }, [dispatch, data, error]);

  const setSelectedMetrics = selectedMetrics => {
    dispatch(metricActions.selectdMetricsData({ metrics: selectedMetrics }));
  };

  if (fetching) return <h1>Loading....</h1>;

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      placeholder="select metrics..."
      isMulti
      options={metrics}
      onChange={setSelectedMetrics}
    />
  );
};

export default () => {
  return (
    <Provider value={client}>
      <MetricsDropDown />
    </Provider>
  );
};
