import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Metric = {
  label: string;
  value: string;
};

export type DashboardMetrics = {
  metrics: Metric[];
};

export type ApiErrorAction = {
  error: string;
};

const initialState: { metrics: Metric[] } = {
  metrics: [],
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    selectdMetricsData: (state, action: PayloadAction<DashboardMetrics>) => {
      const { metrics } = action.payload;
      state.metrics = metrics;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
