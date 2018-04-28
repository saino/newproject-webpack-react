import React, { Component } from "react";
import SaveImg from "../../statics/save.png";
import PubImg from "../../statics/pub.png";
import TransformImg from "../../statics/transform.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeWork, saveWork } from "../../../stores/reducers/work"


import CancelImg from "../../statics/cancel.png";
import ZoomInImg from "../../statics/zoomin.png";
import ZoomOutImg from "../../statics/zoomout.png";
import MoveImg from "../../statics/move.png";
import AlertView from "./alert-view";
import DeleImg from "../../statics/dele.png";

class OperationArea extends Component {

    constructor(){
        super();
        // this.state = {
        //     videoPX: "this.props.work1.videoPX",
        //     videoType: "this.props.work1.videoType"
        // }
    }
    componentWillMount(){
        // this.setState({
        //     videoPX: this.props.work.videoPX,
        //     videoType: this.props.work.videoType
        // });
    }

    render() {
        return <div className="operation-area">
            <div className="operation-btn1" onClick={this.onSaveClick}><img src={SaveImg} /><div>保存</div></div>
            <div className="operation-btn1" onClick={this.onPubClick}><img src={PubImg} /><div>发布</div></div>
            <div className="operation-bank"></div>
            <div className="operation-btn2" onClick={this.onMaterialLibClick}>素材库</div>
            <div className="operation-btn2" onClick={this.onAudioLibClick}>音频库</div>
            <div className="operation-icons">
                <div><img className="operation-icon" src={CancelImg} /></div>
                <div><img className="operation-icon" src={MoveImg} /></div>
                <div><img className="operation-icon" onClick={this.onZoomInClick} src={ZoomInImg} /></div>
                <div><img className="operation-icon" onClick={this.onZoomOutClick} src={ZoomOutImg} /></div>
            </div>
            <style>{`
                .operation-area{
                    position: relative;
                    height: 574px;
                    width: 40px;
                    background: rgba(13,29,33,1);
                    color: #fff;
                    font-size: 12px;
                    z-index: 1;
                }
                .operation-btn1{
                    height: 40px;
                    width: 40px;
                    text-align: center;
                    background: rgba(29,54,57,1);
                    margin-bottom: 1px;
                    padding-top: 4px;
                    cursor: pointer;
                }
                .operation-bank{
                    height: 23px;
                }
                .operation-btn2{
                    margin-bottom: 1px;
                    text-align: center;
                    color: rgba(129,139,138,1);
                    height: 40px;
                    width: 40px;
                    background:  rgba(29,54,57,1);
                    line-height: 40px;
                    cursor: pointer;
                }
                .operation-icons{
                    display: flex;
                    position: absolute;
                    flex-direction: column;
                    bottom: 6px;
                    width: 100%;
                }
                .operation-icons div{
                    width: 100%;
                    text-align: center;
                }
                .operation-icon{
                    text-align: center;
                    margin-bottom: 12px;
                    cursor: pointer;
                }
                
            `}</style>
        </div>
    }
    onSaveClick = () => {
        const { work } = this.props;
        saveWork(work);
    }
    onZoomInClick = () => {
        const { work } = this.props;
        work.config.properties.scale += 0.05;
        this.props.changeWork(work);
    }
    onZoomOutClick = () => {
        const { work } = this.props;
        work.config.properties.scale -= 0.05;
        this.props.changeWork(work);
    }
    renderAlert = () => {
        return <div className="alert-view-container">
            <div className="alert-view-title">视频发布为<div className="close-alert" onClick={this.onAlertCloseClick}><img src={DeleImg} /></div></div>
            <div className="alert-view-content">
                <div className="video-PX">
                    <select onChange={this.onVideoPXChange} defaultValue={this.props.work.config.properties.videoPX}>
                        <option value="px1">800*400</option>
                        <option value="px2">960*540</option>
                        <option value="px3">1280*720</option>
                        <option value="px4">1920*1080</option>
                        <option value="px5">2K</option>
                    </select>
                </div>
                <div className="video-type">
                    <select onChange={this.onVideoTypeChange} defaultValue={this.props.work.config.properties.videoType}>
                        <option value="type1">.mp4</option>
                        <option value="type2">.avi</option>
                        <option value="type3">.3gp</option>
                    </select>
                </div>
                <div className="video-pub" onClick={this.onVideoPubClick}>发布</div>
            </div>
            
            <style>{`
                .alert-view-container{
                    height: 216px;
                    width: 360px;
                    background: rgba(38,66,70,0.8);
                }
                .alert-view-title{
                    position: relative;
                    height: 40px;
                    text-align: center;
                    font-size: 14px;
                    color: #fff;
                    line-height: 40px;
                    background: rgba(58,104,108,0.4);
                }
                .close-alert{
                    height: 40px;
                    cursor: pointer;
                    width: 40px;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
                .alert-view-content{
                    display: flex;
                    flex-flow: row wrap;
                    padding: 32px 60px;
                    justify-content: space-between;
                    font-size: 14px;
                }
                .video-PX{
                    width: 120px;
                    height: 40px;
                    background: rgba(255, 255,255,0.7);
                    color: #000;
                }
                .video-type{
                    width: 110px;
                    height: 40px;
                    background: rgba(255, 255,255,0.7);
                    color: #000;
                }
                .alert-view-content select{
                    height: 100%;
                    width: 100%;
                    background: rgba(0,0,0,0);
                    text-indent: 10%;
                }
                .video-pub{
                    background-image: linear-gradient(150deg, #6CA1A5 0%, #3A686C 84%);
                    width: 240px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    color: #C4BF97;
                    cursor: pointer;
                    margin-top: 32px;
                }
            `}</style>
        </div>
    }

    renderPubComplete = () => {
        return <div className="alert-view-container">
            <div className="alert-view-title">视频发布为<div className="close-alert" onClick={this.onAlertCloseClick}><img src={DeleImg} /></div></div>
            <div className="alert-view-content">
                <div>发布完成, 保存到云空间</div>
            </div>
            <style>{`
                .alert-view-container{
                    height: 216px;
                    width: 360px;
                    background: rgba(38,66,70,0.8);
                }
                .alert-view-title{
                    position: relative;
                    height: 40px;
                    text-align: center;
                    font-size: 14px;
                    color: #fff;
                    line-height: 40px;
                    background: rgba(58,104,108,0.4);
                }
                .close-alert{
                    height: 40px;
                    cursor: pointer;
                    width: 40px;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
                .alert-view-content{
                    display: flex;
                    flex-flow: row wrap;
                    padding: 32px 60px;
                    font-size: 14px;
                    align-items: center;
                    height: calc(100% - 40px);
                    justify-content: center;
                    color: #fff;
                }
            `}</style>
        </div>
    }
    // changeWork
    onVideoPXChange = (e) => {

        const value = e.target.value;
        this.setState({
            videoPX: value
        });
    }
    onVideoTypeChange = (e) => {
        const value = e.target.value;
        this.setState({
            videoType: value
        });
    }
    onVideoPubClick = () => {
        const work = this.props.work;
        const newWork = {...work, config: {...work.config, properties: {...work.config.properties, videoPX: this.state.videoPX, videoType: this.state.videoType}}};
        this.props.changeWork(newWork);
        AlertView.render(this.renderPubComplete());
    }

    onAlertCloseClick(){
        AlertView.removeDom();
    }
    onPubClick = () => { 
        AlertView.render(this.renderAlert());
    }
    onMaterialLibClick = () => {
        this.props.changeaActiveContainer("material", ["video", "image"]);
    }
    onAudioLibClick = () => {
        this.props.changeaActiveContainer("audio", ["video", "image"]);
    }
}
const mapStateToProps = ({work}) => {
    return {
        work
    };
}
const mapDispathcToProps = (dispatch) => {
    return {
        changeWork: bindActionCreators(changeWork, dispatch),
        // saveWork: bindActionCreators(saveWork, dispatch)
    }
}
export default connect(mapStateToProps, mapDispathcToProps)(OperationArea);