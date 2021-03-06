import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
// import promise from 'redux-promise';
import thunk from 'redux-thunk';

import App from './containers/App';
import './index.css';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import promise from 'redux-promise';
//
// import reducers from './reducers';
// import App from './containers/App';
//
// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
//
//
// require('./index.scss');
//
// ReactDOM.render(
//     <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
//         <App />
//     </Provider>,
//     document.getElementById('app')
// );