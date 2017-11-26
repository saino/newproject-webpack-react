import ClassNames from 'classnames'
import React from "react";
import { Icon } from 'antd'


import "./leftNavigationButton.css";

class LeftNavigationButton extends React.Component {
    getButton() {
        return this.props.button;
    }
    isActive() {
        return this.getButton().buttonName === this.props.activeName;
    }
    render(){
        const classNames = ClassNames("left-navigation-button", 
            {"active": this.isActive()}, 
            {"not-active": !this.isActive()});
        return <div className={classNames}
            onClick={this.onButtonClicked}>
            <div className="left-navigation-button-icon"><Icon type={this.getButton().buttonIcon}/></div>
            <div className="left-navigation-button-name">{this.getButton().buttonName}</div>
        </div>
    }
    onButtonClicked = () => {
        this.getButton().buttonAction(this.getButton());
    }    
}

export default LeftNavigationButton;
