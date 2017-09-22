import React from 'react'
import { NavLink } from 'react-router-dom'

import './style.css'

export default () => {
    return (<div className="nav">
        <div><NavLink exact to='/' activeClassName="active">home </NavLink></div>
        <div>
            <NavLink to='/login'  activeClassName="active">login </NavLink>
        </div>
        <div>
            <NavLink to='/register'  activeClassName="active">register</NavLink>
        </div>
        <div>
            <NavLink to='/user'  activeClassName="active">个人中心</NavLink>
        </div>

    </div >)
}