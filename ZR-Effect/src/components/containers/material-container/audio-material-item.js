import React, { Component } from "react";
import { Icon, Progress } from "antd";
import config from "../../../config";
import moment from "moment";

class AudioMaterialItem extends Component {
    constructor(){
        super();
        this.state = {
            showUse: false,
            play: false,
            playProgress: 0
        }
    }
    onAudioPlayClick = () => {
        let timer = null;
        if (this.state.play) {
            this.refs.audio.pause();
        } else {
            this.refs.audio.play();
        };
        this.setState({
            play: !this.state.play
        });
    }
    showTime = () => {
        const { model } = this.props;
        const { properties } = model;
        if (model.type === "image") {
            return "";
        }

        const formatTime = moment.duration(properties.duration * 1000);
        return `${formatTime.hours() < 10 ? "0" + formatTime.hours() : formatTime.hours()} :
                ${formatTime.minutes() < 10 ? "0" + formatTime.minutes() : formatTime.minutes()} :
                ${formatTime.seconds() < 10 ? "0" + formatTime.seconds() : formatTime.seconds()}`;

    }
    componentDidMount() {
        this.timer = setInterval(() => {
            const audioComponent = this.refs.audio;
            const progress = audioComponent.currentTime / audioComponent.duration;
            if (progress !== this.state.playProgress) {
                this.setState({
                    playProgress: Math.round(progress * 100)
                });
            }
        }, 500);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    onShowUse = () => {
        this.setState({
            showUse: true
        });
    }
    onHideUse = () => {
        this.setState({
            showUse: false
        });
    }
    onDeleClick = () => {
        const { model } = this.props;
        this.props.onDeleClick(model);
    }
    render() {
        const { model } = this.props;
        const { properties } = model;
        const useClass = "audio-use " + (this.state.showUse ? "show" : "hide");
        return <div className="audio-item" onMouseOver={this.onShowUse} onMouseOut={this.onHideUse}>
            <div className="audio-control">
                <div className="audio-play" onClick={this.onAudioPlayClick}>{this.state.play ? <Icon type="pause" /> : <Icon type="caret-right" />}</div>
                <Progress className="audio-progress" percent={this.state.playProgress} size="small" showInfo={false} strokeWidth={5} />
            </div>
            <div className="name-edit">
                <div className="audio-name">{model.name}</div>
                <div className="audio-detail">{`
                    ${properties.format} 
                    ${Math.round(properties.filesize / 1024)}K 
                    ${this.showTime()}
                `}</div>
                <audio ref="audio" style={{ display: "none" }} src={`${config.fileUpload.host}:${config.fileUpload.port}${model.path}`} controls />
            </div>
            <div className={useClass}>
                <div className="use-item" onClick={this.onDeleClick}>删除</div>
            </div>
            <style>{`
                .audio-item:hover {
                    box-shadow: 0 0 9px 6px rgba(255,255,255,0.50);
                }
                .audio-item{
                    width: 147px;
                    height: 70px;
                    margin: 16px;
                    background: rgba(45,75,80,0.80);
                    position: relative;
                }
                 .audio-control{
                    height: 26px;
                    background: #103233;
                    display: flex;
                    padding: 4px 8px;
                }
                .audio-play{
                    cursor: pointer;
                }
                .audio-progress{
                    height: 20px;
                    margin-left: 4px;
                }
                .name-edit{
                    padding-top: 8px;
                    height: 44px;
                }
                .audio-name{
                    font-size: 12px;
                    color: #fff;
                    text-indent: 8px;
                    // margin-top: 8px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .audio-detail{
                    font-size: 10px;
                    color: #818B8A;
                    text-indent: 8px;
                }
                .audio-play{
                    color: #fff;
                    font-size: 12px;
                }
                .audio-use{
                    position: absolute;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    color: #fff;
                    width: 100%;
                    height: 44px;
                    line-height: 44px;
                    text-align: center;
                    font-size: 16px;
                }
                .show{
                    display: flex;
                    justify-content: space-around;
                }
                .hide{
                    display: none;
                }
                .use-item{
                    cursor: pointer;
                }
            `}</style>
        </div>
    }


}

export default AudioMaterialItem;