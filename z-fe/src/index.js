import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom'
import Routers from './routers/Routers';
import configureStore from './store/configureStore';
import { AppContainer } from 'react-hot-loader';
import {getUserInfo}from './utils';
import 'antd/dist/antd.css';


const store = configureStore({userInfo:getUserInfo()})

ReactDOM.render(
    <AppContainer>
        <Routers store={store} />
    </AppContainer>,
    document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./routers/Routers', () => {
        const NextApp = require('./routers/Routers').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp store={store}/>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
