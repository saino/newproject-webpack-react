import React, { Component } from "react";
import PreFrame from "../../statics/preframe.png";
import Play from "../../statics/play.png";
import NextFrame from "../../statics/nextframe.png";
import AddImg from "../../statics/add.png";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changVideoPlay, changeWorkProperties } from "../../../stores/reducers/work";
import Scale from "../../../components/commons/Scale";
import ScrollArea from 'react-custom-scrollbars';


class TimeArea extends Component {
    configureTickHandle = (currentFrameNum) => {
        const { work } = this.props;
        const { properties } = work.config;
        properties.currentFrameNum = currentFrameNum;
        this.props.changeWorkProperties(properties);
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
        const { work } = this.props;
        const { properties } = work.config;
        return properties.currentFrameNum;
    }
    render() {
        // console.log(this.getFrameNum());
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
            `}</style>
        </div>
    }
    onPlayClick = () => {
        this.props.changVideoPlay(!this.props.work.config.properties.videoPlay);
    }
    onAddVideoClick = () => {
        this.props.changeaActiveContainer("material", ["video"]);
    }
}
const mapStateToProps = ({work}) => {
    return {
        work
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        changVideoPlay: bindActionCreators(changVideoPlay, dispatch),
        changeWorkProperties: bindActionCreators(changeWorkProperties, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeArea);