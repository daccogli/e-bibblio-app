import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router} from 'react-router-dom';
import { applyMiddleware,  createStore } from 'redux';
import { setIsSignedIn } from './store/reducers';

import thunk from 'redux-thunk'; 
const store = createStore(setIsSignedIn, (applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
, document.getElementById('root'));


serviceWorker.unregister();
