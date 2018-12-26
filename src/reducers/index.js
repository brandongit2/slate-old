import {combineReducers} from 'redux';

import dialog from './dialog';
import layers from './layers';
import {nodes, selections} from './nodes';
import tools from './tools';
import touches from './touches';
import wndw from './window';

const rootReducer =  combineReducers({
    dialog,
    layers,
    nodes,
    tools,
    selections,
    touches,
    window: wndw,
});

export default rootReducer;
