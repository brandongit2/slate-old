import {combineReducers} from 'redux';

import currentTool from './currentTool';
import touches from './touches';
import properties from './properties';
import wndw from './window';

const rootReducer =  combineReducers({
    touches,
    window: wndw,
    currentTool,
    properties
});

export default rootReducer;
