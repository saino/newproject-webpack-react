import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './rightArticle.css'

class LeftNavigation extends React.Component {
    render(){
        return <div className="right-article">{this.props.children}</div>
    }
}
export default LeftNavigation;