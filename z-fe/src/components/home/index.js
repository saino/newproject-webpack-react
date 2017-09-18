import React from 'react'
import Nav from '../nav'
import {Link} from 'react-router-dom'
export default ()=>{
    return (<div className="home">
        <Nav></Nav>
        home
        <div>
            <Link to='/user'>我的作品</Link>
        </div>
    </div>)
}