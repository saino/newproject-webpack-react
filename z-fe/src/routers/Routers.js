import React from 'react'
import PropTypes from 'prop-types'

import {Route, BrowserRouter} from 'react-router-dom'
import Loadable from 'react-loadable';
import PageLoading from '../components/pageLoading'
import Home from '../components/home/Home'
import {Provider} from 'react-redux'
// import User from '../components/User'
import Login from '../containers/Login';
import Register from '../containers/Register';
import UserCenter from '../containers/UserCenter';



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
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/user" component={UserCenter}/>

            </div>
        </BrowserRouter>
    </Provider>
)

Routers.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Routers
