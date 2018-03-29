import React, { Component } from "react";
import ReactDOM from "react-dom"
class AlertDom extends Component {
    render(){
        return <div className="alert" >
            {this.props.children}
            <style>{`
                .alert{
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    left: 0;
                    top: 0;
                    background: rgba(0,0,0,0.5);
                    justify-content: space-around;
                    display: flex;
                    align-items: center;
                }
            `}</style>
        </div>
    }
}
class AlertViewClass{
    constructor(){
        this.domId = "alert-dom"
        let alerDom = document.createElement("DIV");
        alerDom.setAttribute("id", this.domId);
        alerDom.onclick = () => {
            this.remove();
        }
        document.querySelector("body").appendChild(alerDom);
    }
    render(htmlDom){
        ReactDOM.render(<AlertDom>{htmlDom}</AlertDom>, document.querySelector("#"+this.domId));
    }
    remove() {
        ReactDOM.unmountComponentAtNode(document.querySelector("#"+this.domId));
    }
}
const AlertView = new AlertViewClass();
export default AlertView;