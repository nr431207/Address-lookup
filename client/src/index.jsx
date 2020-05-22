import React from 'react';

import ReactDOM from 'react-dom';

import App from './App.jsx';

import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import rootReducer from './reducers/reducers';

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
