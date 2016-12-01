import { combineReducers } from 'redux';
import steps from './steps';
import plans from './plans';
import accounts from './accounts';

export default combineReducers({
    steps,
    plans,
    accounts,
});
