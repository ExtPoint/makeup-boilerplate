import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import '../utils/locale';
import reducer from './reducers';
import PayContainer from './containers/PayContainer';
import {loadAllData} from './actions';

// Create store
const store = createStore(
    reducer,
    applyMiddleware(thunk, createLogger())
);

// Fetch data from server
store.dispatch(loadAllData());

// Render application
render(
    <Provider store={store}>
        <PayContainer />
    </Provider>,
    document.getElementById('root')
);
