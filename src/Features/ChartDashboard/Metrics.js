import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getCurrentCurrentValueForSelectedMeteric } from './redux/selectors';

const Metrics = ({ metric: { value } }) => {
  const { currentMeasurement, currentMeasurementUnit } = useSelector(getCurrentCurrentValueForSelectedMeteric(value));
  return (
    <Grid item xs={4}>
      <Card>
        <CardContent>
          <Typography variant={'h4'}>{value}</Typography>
          <hr />
          <Typography variant={'h2'}>
            {currentMeasurement} {currentMeasurementUnit}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Metrics;
