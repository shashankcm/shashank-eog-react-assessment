import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MetricsDropDown from './MetricsDropDown';

const useStyles = makeStyles({
  chart__dropDown: {
    width: '60vw',
    margin: '0 auto',
    paddingTop: '10vh',
  },
});

const ChartDashboard = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.chart__dropDown}>
        <MetricsDropDown />
      </div>
    </div>
  );
};

export default ChartDashboard;
