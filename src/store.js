import {createStore} from 'redux';

import rootReducer from './reducers';

let store = createStore(
    rootReducer,
    {
        window: {
            width:  0,
            height: 0
        },
        touches: {}
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
