import ClassNames from 'classnames'
import React from "react";
import { Icon } from 'antd'


import "./leftNavigationButton.css";

class LeftNavigationButton extends React.Component {
    isActive() {
        return this.props.buttonName === this.props.activeName;
    }
    render(){
        const classNames = ClassNames("left-navigation-button", 
            {"active": this.isActive()}, 
            {"not-active": !this.isActive()});
        return <div className={classNames}
            onClick={this.onButtonClicked}>
            <div className="left-navigation-button-icon"><Icon type={this.props.buttonIcon}/></div>
            <div className="left-navigation-button-name">{this.props.buttonName}</div>
        </div>
    }
    onButtonClicked = () => {
        this.props.setActiveName(this.props.buttonName);
        this.props.buttonAction();
    }    
}

export default LeftNavigationButton;
