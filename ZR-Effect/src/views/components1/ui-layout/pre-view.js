import React, { Component } from 'react';
import aaaVideo from "../../statics/aaa.mp4";
import aaaImage from '../../statics/aaa.png';
import './pre-view.css'

class PreView extends Component {
    render(){
        return this.renderView()
    }
    renderView(){
        const { model } = this.props;
        if(model.type === "video"){
            return <video className="pre-view" src={aaaVideo} controls/>
        }
        if(model.type === "image"){
            return <img className="pre-view" src={aaaImage}/>
        }
    }
}

export default PreView;