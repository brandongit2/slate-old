import {combineReducers} from 'redux';

import currentTool from './currentTool';
import {nodes, selections} from './nodes';
import toolSettings from './toolSettings';
import touches from './touches';
import wndw from './window';

const rootReducer =  combineReducers({
    currentTool,
    nodes,
    toolSettings,
    selections,
    touches,
    window: wndw,
});

export default rootReducer;
