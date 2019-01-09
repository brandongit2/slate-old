import {combineReducers} from 'redux';

import {isDialogVisible, dialog} from './dialog';
import {currentNode, things} from './things';
import {currentTool, toolSettings} from './tools';
import {panels} from './panels';
import {wndw} from './window';

const rootReducer = combineReducers({
    isDialogVisible, dialog,
    currentNode, things,
    currentTool, toolSettings,
    panels,
    window: wndw,
});

export default rootReducer;
