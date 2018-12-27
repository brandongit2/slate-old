import {createStore} from 'redux';

import config from './config.json';
import rootReducer from './reducers';

let store = createStore(
    rootReducer,
    {
        dialog: {
            visible: false,
            title:   'Dialog title',
            content: 'Dialog content'
        },
        layers: {
            current:  'initial',
            selected: [],
            layers:   {
                initial: {
                    name:  'Base',
                    type:  'draw',
                    nodes: []
                }
            },
            order: ['initial']
        },
        nodes: {},
        tools: {
            current:  'brush',
            settings: config.tools
        },
        window: {
            width:  0,
            height: 0
        },
        touches: {}
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
