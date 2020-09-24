import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../../../store/index';
import { Metric } from './metricsReducer';

const getMetrics = (state: IState) => state.metrics.metrics;
const getMetricsMeasurements = (state: IState) => state.measurements.measurements;

export const getSelectedMetrics = createSelector(
  [(state: IState) => getMetrics(state)],
  (metrics: Metric[]) => metrics || [],
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

export const generateChartData = createSelector(
  [(state: IState) => getMetricsMeasurements(state), (state: IState) => getMetrics(state)],
  (measurements, selectedMetrics) => {
    const chartData = Object.values(
      measurements
        .flatMap(measurement => measurement.measurements)
        .reduce((acc: any, measurement): any => {
          acc[measurement.at] = {
            ...acc[measurement.at],
            [measurement.metric]: measurement.value,
            time: measurement.at,
          };
          return acc;
        }, {}),
    );

    return { chartData, measurements, selectedMetrics };
  },
);
