import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import App from '../containers/App'
import UserPage from '../containers/UserPage'
import RepoPage from '../containers/RepoPage'
import Loadable from 'react-loadable';
import PageLoading from '../components/pageLoading'
import Home from '../components/home'
// import User from '../components/User'

//动态路由 异步加载
const Login = Loadable({
    loader: () => import('../containers/Login'),
    loading:PageLoading
});
const Register = Loadable({
    loader: () => import('../components/register'),
    loading:PageLoading
});

const UserCenter = Loadable({
    loader: () => import('../containers/UserCenter'),
    loading:PageLoading
});
const Routers = ({ store }) => (
    <Provider store={store}>
        <div>
             <Route  path="/search/:name" component={App} />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/user" component={UserCenter} />
             <Route path="/repo/:login/:name"
                   component={RepoPage} />
            <Route path="/gituser/:login"
                   component={UserPage} />

        </div>
    </Provider>
)

Routers.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Routers
