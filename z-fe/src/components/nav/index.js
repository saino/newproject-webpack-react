import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export default () => {
    return (<div className="nav">
        <div><Link to='/'>home </Link></div>
        <div>
            <Link to='/login'>login </Link>
        </div>
        <div>
            <Link to='/register'>register</Link>
        </div>
        <div>
            <Link to='/user'>个人中心</Link>
        </div>

    </div >)
}