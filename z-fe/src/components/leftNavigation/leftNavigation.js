import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import LeftNavigationButton from './leftNavigationButton'

import "./leftNavigation.css"

class LeftNavigation extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            activeName: null
        }
    }
    componentWillMount() {
        this.setState({
            activeName: this.props.defaultActiveName
        });
    }
    setActiveName = (activeName)=> {
        this.setState({
            activeName: activeName
        })
    }
    render(){
        return <div className="left-navigation">
            {
                this.props.buttons.map((button, index)=>{
                    return <LeftNavigationButton {...button} 
                        activeName={this.state.activeName}
                        setActiveName={this.setActiveName}
                        key={index}/>;
                })
            }
        </div>
    }
}
export default LeftNavigation;