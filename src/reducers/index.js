import {combineReducers} from 'redux';

import currentTool from './currentTool';
import {nodes, selections} from './nodes';
import properties from './properties';
import touches from './touches';
import wndw from './window';

const rootReducer =  combineReducers({
    currentTool,
    nodes,
    properties,
    selections,
    touches,
    window: wndw,
});

export default rootReducer;
