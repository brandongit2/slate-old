import {combineReducers} from 'redux';
import touches from './touches';
import window from './window';

const rootReducer =  combineReducers({
    touches,
    window
});

export default rootReducer;
