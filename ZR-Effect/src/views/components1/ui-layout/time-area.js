import React, { Component } from "react";
import PreFrame from "../../statics/preframe.png";
import Play from "../../statics/play.png";
import NextFrame from "../../statics/nextframe.png";
import AddImg from "../../statics/add.png";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changVideoPlay, changeWorkProperties, changWorkVideo } from "../../../stores/reducers/work";
import { changeFrameNum } from "../../../stores/reducers/frame-num"
import Scale from "../../../components/commons/Scale";
import ScrollArea from 'react-custom-scrollbars';
import DragList from 'react-draggable-list';
import config from "../../../config";
import DeleImg from "../../statics/dele.png";
import VideoItem from "./video-item";



class TimeArea extends Component {
    configureTickHandle = (currentFrameNum) => {
        this.props.changeFrameNum(currentFrameNum);
    }
    onChangeTick = (currentFrameNum) => {
        // const { work } = this.props;
        // const { properties } = work.config;
        // properties.currentFrameNum = currentFrameNum;
        // this.props.changeWorkProperties(properties);
    }
    getFrameCount = () => {
        const { work } = this.props;
        const { videos } = work.config;
        let frameNum = 0;
        for(let i= 0; i<videos.length; i++){
            frameNum += videos[i].properties.length;
        };
        return frameNum;
    }
    getCurrentframeNum = () => {
        const { frame } = this.props;
        return frame.frameNum;
    }
    render() {
        const videoLength = "2001px";
        const list = this.props.work.config.videos.map((video, index)=>{
            return { ...video, index: index };
        });
        return <div className="time-area">
            <ScrollArea style={{ width: '100%', height: '100%' }}>
                <div className="time-control">
                    <div className="control-video">
                        <div><img src={PreFrame} /> </div>
                        <div onClick={this.onPlayClick} className="control-play"><img src={Play} /> </div>
                        <div><img src={NextFrame} /> </div>
                    </div>
                    <div onClick={this.onAddVideoClick} className="add-video"><img src={AddImg}/>添加视频</div>
                </div>
                <div className="time-scale">
                    <Scale currTick={this.getCurrentframeNum()} maxTick={this.getFrameCount()} onChangeTick={this.onChangeTick} onEnd={this.configureTickHandle} />
                </div>
                <div className="time-video" style={{ width: `${this.getFrameCount()*5 - 3 - this.props.work.config.videos.length }px` }}>
                    {/* <DragList list={list} itemKey="id" template={VideoItem} padding={0} onMoveEnd={this.onMoveEnd} /> */}
                    {this.props.work.config.videos.map((video, index)=>{
                        return <div className="time-video-item" style={{width: `${video.properties.length*5}px`}} key={index}>
                            <img className="time-video-item-thumb" src={`${config.fileUpload.host}:${config.fileUpload.port}${config.proxyTarget.path}/materials/${video.materialId}/thumb.jpg`}/>
                            <div className="time-video-item-name">{video.name}</div>
                            <img className="time-video-item-delete" src={DeleImg} onClick={this.onDeleteVideoClick.bind(this, video)}/>
                        </div>
                    })}
                </div>
            </ScrollArea>
            <style>{`
                .time-area{
                    height: 126px;
                    width: calc(100% - 240px);
                    background: rgba(14,27,32,1);
                    margin-top: -126px;
                    position: relative;
                    padding: 0 32px;
                    z-index: 1;
                }
                .time-control{
                    width: 100%;
                    height: 37px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    line-height: 37px;
                    color: rgba(196,191,151,1);
                }
                .control-video{
                    display: flex;
                    flex-grow: initial;
                    width: 68px;
                    justify-content: space-between;
                }
                .control-video div{
                    cursor: pointer;
                }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                .control-play{
                    margin-top: 6px;
                }
                .add-video{
                    cursor: pointer;
                }
                .add-video img{
                    margin-right: 9px;
                }
                .time-scale{
                    width: 100%;
                    height: 30px;
                }
                .time-video{
                    display:flex;
                    margin-left: 4px;
                }
                .time-video-item{
                    height: 40px;
                    margin-right: 1px;
                    display: flex;
                    border: solid 1px #3A666A;
                }
                .time-video-item-thumb{
                    height: 38px;
                    width: 40px;
                    margin-right: 10px;
                }
                .time-video-item-name{
                    height: 38px;
                    line-height: 38px;
                    font-size: 12px;
                    color: #C4BF97;
                    flex: 1;
                }
                .time-video-item-delete{
                    height: 12px;
                    width: 12px;
                    float: right;
                    margin-right: 14px;
                    margin-top: 14px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    }
    onDeleteVideoClick = (video, evt) => {
        const { videos } = this.props.work.config;
        if (this.props.work.config.properties.videoPlay) {
            alert("请先暂停播放！");
            return;
        }
        if(videos.length < 2){
            alert("至少需要一个主视频!");
            return;
        }
        const newVideos = videos.reduce((newVideo, currentVideoItem, index)=>{
            if(currentVideoItem.id !== video.id){
                currentVideoItem.order = newVideo.length+1;
                newVideo.push(currentVideoItem);
            }
            return newVideo;
        },[]);
        this.props.changWorkVideo(newVideos);
    }
    onPlayClick = () => {
        this.props.changVideoPlay(!this.props.work.config.properties.videoPlay);
    }
    onAddVideoClick = () => {
        if(this.props.work.config.properties.videoPlay){
            alert("请先暂停播放！");
            return;
        }
        this.props.changeaActiveContainer("material", ["video"]);
    }
}
const mapStateToProps = ({ work, frame }) => {
    return {
        work,
        frame
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        changVideoPlay: bindActionCreators(changVideoPlay, dispatch),
        changeFrameNum: bindActionCreators(changeFrameNum, dispatch),
        changWorkVideo: bindActionCreators(changWorkVideo, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeArea);