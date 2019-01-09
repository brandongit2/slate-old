import {createStore} from 'redux';

import config from './config.json';
import rootReducer from './reducers';

let store = createStore(
    rootReducer,
    {
        isDialogVisible: false,
        dialog:          {
            title:   'Dialog title',
            content: 'Dialog content'
        },

        currentNode: 'none',
        things:      {
            root: {
                thingType:   'group',
                displayName: 'Root',
                type:        '',
                expanded:    true,
                nodes:       []
            }
        },

        currentTool:  'brush',
        toolSettings: config.tools,

        panels: [],
        window: {
            width:  0,
            height: 0
        }
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
