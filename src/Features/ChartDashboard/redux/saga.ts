import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { actions as MetricsAction, ApiErrorAction as MetricsApiErrorAction } from './metricsReducer';
import { actions as MeasurementActions, ApiErrorAction as MeasurementsApiErrorAction } from './measurementReducer';
import { PayloadAction } from '@reduxjs/toolkit';

function* metricsApiErrorReceived(action: PayloadAction<MetricsApiErrorAction>) {
  yield call(toast.error, `Metrics Error Received: ${action.payload.error}`);
}

function* measurementsApiErrorReceived(action: PayloadAction<MeasurementsApiErrorAction>) {
  yield call(toast.error, `Measurements Error Received: ${action.payload.error}`);
}

function* watchMetricsApiError() {
  yield takeEvery(MetricsAction.metricsApiErrorReceived.type, metricsApiErrorReceived);
}

function* watchMeasurementsApiError() {
  yield takeEvery(MeasurementActions.measurementApiErrorReceived.type, measurementsApiErrorReceived);
}

export default [watchMetricsApiError, watchMeasurementsApiError];
