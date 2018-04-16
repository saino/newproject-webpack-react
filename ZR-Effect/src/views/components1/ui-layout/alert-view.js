import React, { Component } from "react";
import ReactDOM from "react-dom"
class AlertDom extends Component {
    render(){
        return <div className="alert-xxxyyy" onClick={this.onAClick}>
            {this.props.children}
            <style>{`
                .alert-xxxyyy{
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    left: 0;
                    top: 0;
                    background: rgba(0,0,0,0.5);
                    justify-content: space-around;
                    display: flex;
                    align-items: center;
                    z-index: 10;
                }
            `}</style>
        </div>
    }
    onAClick = (e) => {
        if(e.target.getAttribute("class") === "alert-xxxyyy"){
            this.props.removeDom();
        }
    }
}
class AlertViewClass{
    constructor(){
        this.domId = "alert-dom"
        let alerDom = document.createElement("DIV");
        alerDom.setAttribute("id", this.domId);

        document.querySelector("body").appendChild(alerDom);
    }
    render(htmlDom){
        ReactDOM.render(<AlertDom removeDom={this.removeDom}>{htmlDom}</AlertDom>, document.querySelector("#"+this.domId));
    }
    removeDom = () => {
        ReactDOM.render(<div><div></div></div>, document.querySelector("#" + this.domId));
    }
}
const AlertView = new AlertViewClass();
export default AlertView;