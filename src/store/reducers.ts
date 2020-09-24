import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/ChartDashboard/redux/metricsReducer';
import { reducer as measurementReducer } from '../Features/ChartDashboard/redux/measurementReducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  measurements: measurementReducer,
};
