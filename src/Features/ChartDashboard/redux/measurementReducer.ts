import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import setMetrics from './utils';

export type Measurement = {
  at: number;
  metric: string;
  unit: string;
  value: number;
};

export type InitalMeasurementState = {
  measurements: {
    metric: string;
    measurements: Measurement[];
    currentMeasurement: number;
    currentMeasurementUnit: string;
  }[];
};

export type NewMeasurements = {
  newMeasurement: Measurement;
};

export type InitialMeasurementMetrics = {
  getMultipleMeasurements: Measurement[];
};

export type ApiErrorAction = {
  error: string;
};

type InitialMultipleMeasurements = {
  getMultipleMeasurements: {
    measurements: Measurement[];
    metric: string;
    __typename: string;
  }[];
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

const slice = createSlice({
  name: 'metricsMeasurements',
  initialState,
  reducers: {
    initialMeasurementDataReceived: (state, action: PayloadAction<InitialMultipleMeasurements>) => {
      const { getMultipleMeasurements } = action.payload;
      const measurements = getMultipleMeasurements.reduce(
        (acc: any, val: { metric: any; measurements: string | any[] }): any => {
          const measurement = {
            metric: val.metric,
            measurements: val.measurements,
            currentMeasurement: val.measurements[val.measurements.length - 1].value,
            currentMeasurementUnit: val.measurements[0].unit,
          };
          return [...acc, measurement];
        },
        [],
      );

      state.measurements = measurements;
    },
    measurementDataReceived: (state, action: PayloadAction<NewMeasurements>) => {
      const { newMeasurement } = action.payload;
      state.measurements = [...setMetrics(state, newMeasurement)];
    },
    measurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
