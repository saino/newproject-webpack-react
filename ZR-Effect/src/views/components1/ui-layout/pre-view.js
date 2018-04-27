import React, { Component } from 'react';
import aaaVideo from "../../statics/aaa.mp4";
import aaaImage from '../../statics/aaa.png';
import './pre-view.css'
import config from "../../../config"

class PreView extends Component {
    render(){
        return this.renderView()
    }
    renderView(){
        const { model } = this.props;

        if(model.type === "video"){
            return <video className="pre-view" 
                controls
                src={`${config.proxyTarget.host}:${config.proxyTarget.port}${model.path}`}/>
        }
        if(model.type === "image"){
            return <img className="pre-view" src={`${config.proxyTarget.host}:${config.proxyTarget.port}${model.path}`}/>
        }
    }
}

export default PreView;