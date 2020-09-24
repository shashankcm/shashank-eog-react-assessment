import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getCurrentCurrentValueForSelectedMeteric } from './redux/selectors';

const Metrics = ({ metric: { value } }) => {
  const metricData = useSelector(getCurrentCurrentValueForSelectedMeteric(value));
  return (
    <Grid item xs={4}>
      <Card>
        <CardContent>
          <Typography variant={'h4'}>{value}</Typography>
          <hr />
          {metricData && (
            <Typography variant={'h2'}>
              {metricData.currentMeasurement} {metricData.currentMeasurementUnit}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Metrics;
