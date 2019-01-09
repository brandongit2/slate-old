import {combineReducers} from 'redux';

import {isDialogVisible, dialog} from './dialog';
import {currentNode, groups, nodes} from './nodes';
import {currentTool, toolSettings} from './tools';
import {panels} from './panels';
import {wndw} from './window';

const rootReducer = combineReducers({
    isDialogVisible, dialog,
    currentNode, groups, nodes,
    currentTool, toolSettings,
    panels,
    window: wndw,
});

export default rootReducer;
