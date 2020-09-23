import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../../store/index';
import { Metric } from './reducer';

const getMetrics = (state: IState) => state.metrics.metrics;
const getMetricsMeasurements = (state: IState) => state.measurements.measurements;

export const getSelectedMetrics = createSelector(
  [(state: IState) => getMetrics(state)],
  (metrics: Metric[]) => metrics,
);

export const getCurrentCurrentValueForSelectedMeteric = (selectedMetric: string) =>
  createSelector(
    [(state: IState) => getMetricsMeasurements(state)],
    measurements => {
      let SlectedMetricValues = measurements.filter(measurement => {
        if (measurement.metric === selectedMetric) {
          return measurements;
        }
        return null;
      });
      return SlectedMetricValues[0];
    },
  );
