import {combineReducers} from 'redux';

import currentTool from './currentTool';
import touches from './touches';
import window from './window';

const rootReducer =  combineReducers({
    touches,
    window,
    currentTool
});

export default rootReducer;
