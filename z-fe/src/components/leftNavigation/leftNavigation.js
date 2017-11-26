import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import LeftNavigationButton from './leftNavigationButton'

import "./leftNavigation.css"

class LeftNavigation extends React.Component {
    render(){
        return <div className="left-navigation">
            {
                this.props.buttons.map((button, index)=>{
                    return <LeftNavigationButton button={button} 
                        activeName={this.props.activeName}
                        key={index}/>;
                })
            }
        </div>
    }
}
export default LeftNavigation;