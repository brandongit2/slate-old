import {combineReducers} from 'redux';

import currentTool from './currentTool';
import layers from './layers';
import {nodes, selections} from './nodes';
import toolSettings from './toolSettings';
import touches from './touches';
import wndw from './window';

const rootReducer =  combineReducers({
    currentTool,
    layers,
    nodes,
    toolSettings,
    selections,
    touches,
    window: wndw,
});

export default rootReducer;
