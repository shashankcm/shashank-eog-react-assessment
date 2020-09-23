import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ChartDashboard from '../Features/ChartDashboard';

const useStyles = makeStyles({
  chart__dashboard__container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#fafafa',
  },
});

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.chart__dashboard__container}>
      <ChartDashboard />
    </div>
  );
};
