import { InitalMeasurementState, Measurement } from './measurementReducer';

const setMetrics = (state: InitalMeasurementState, newMeasurement: Measurement) => {
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

export default setMetrics;
