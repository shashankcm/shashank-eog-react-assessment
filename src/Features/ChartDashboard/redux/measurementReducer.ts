import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SingleMetricMeasurement = {
  at: number;
  metric: string;
  unit: string;
  value: number;
};

export type InitalMeasurementState = {
  measurements: {
    metric: string;
    measurements: SingleMetricMeasurement[];
    currentMeasurement: number;
    currentMeasurementUnit: string;
  }[];
};

export type MeasurementMetric = {
  newMeasurement: SingleMetricMeasurement;
};

export type ApiErrorAction = {
  error: string;
};

const initialState: InitalMeasurementState = {
  measurements: [
    {
      metric: 'oilTemp',
      measurements: [],
      currentMeasurement: 0,
      currentMeasurementUnit: '',
    },
    {
      metric: 'injValveOpen',
      measurements: [],
      currentMeasurement: 0,
      currentMeasurementUnit: '',
    },
    {
      metric: 'tubingPressure',
      measurements: [],
      currentMeasurement: 0,
      currentMeasurementUnit: '',
    },
    {
      metric: 'flareTemp',
      measurements: [],
      currentMeasurement: 0,
      currentMeasurementUnit: '',
    },
    {
      metric: 'waterTemp',
      measurements: [],
      currentMeasurement: 0,
      currentMeasurementUnit: '',
    },
    {
      metric: 'casingPressure',
      measurements: [],
      currentMeasurement: 0,
      currentMeasurementUnit: '',
    },
  ],
};

const setMetrics = (state: InitalMeasurementState, newMeasurement: SingleMetricMeasurement) => {
  const updatedState = state.measurements.map(measurement => {
    if (measurement.metric === newMeasurement.metric) {
      const newMetricmeasurement = {
        metric: newMeasurement.metric,
        measurements: [...measurement.measurements, newMeasurement],
        currentMeasurement: newMeasurement.value,
        currentMeasurementUnit: newMeasurement.unit,
      };
      return newMetricmeasurement;
    }
    return measurement;
  });
  return updatedState;
};

const slice = createSlice({
  name: 'metricsMeasurements',
  initialState,
  reducers: {
    measurementDataReceived: (state, action: PayloadAction<MeasurementMetric>) => {
      const { newMeasurement } = action.payload;
      state.measurements = setMetrics(state, newMeasurement);
    },
    measurementErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
