import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/ChartDashboard/redux/reducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
};
