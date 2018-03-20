import React from 'react';
import PropTypes from 'prop-types';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import {Provider} from 'react-redux';
import { requireAuth } from '../utils/preRouter';
import PageLoading from '../components/pageLoading';
import Home from '../containers/Home';
import Make from '../containers/Make';
import Work from '../containers/Work';
import SpecialEffec from "../containers/SpecialEffec";
//import Material from '../containers/Material';
import NotMatch from '../containers/NotMatch';

//动态路由 异步加载 但是不能实时热替换 开发时调试样式不方便
// const Login = Loadable({
//     loader: () => import('../containers/Login'),
//     loading: PageLoading
// });
// const Register = Loadable({
//     loader: () => import('../components/register'),
//     loading: PageLoading
// });
//
// const UserCenter = Loadable({
//     loader: () => import('../containers/UserCenter'),
//     loading: PageLoading
// });
const Routers = ({store}) => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/works" render={ requireAuth(Work) } />
                <Route exact path="/make/:workId" render={ requireAuth(Make) } />
                <Route exact path="/specialeffec" render={requireAuth(SpecialEffec)} />
                <Route component={ NotMatch } />
            </Switch>
        </BrowserRouter>
    </Provider>
)

Routers.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Routers
