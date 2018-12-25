import {createStore} from 'redux';

import config from './config.json';
import rootReducer from './reducers';

let store = createStore(
    rootReducer,
    {
        currentTool: 'brush',
        nodes:       {},
        properties:  config.tools,
        selections:  [],
        window:      {
            width:  0,
            height: 0
        },
        touches: {}
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
