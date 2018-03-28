import React, { Component } from "react";
import { Icon, Progress  } from "antd";

class AddMaterial extends Component {
    constructor(){
        super();
        this.state = {
            play: false
        }
    }
    render () {
        return <div className="audio-item">
            <div className="audio-control">
                <div className="audio-play" onClick={this.onAudioPlayClick}>{this.state.play ? <Icon type="pause" /> : <Icon type="caret-right" /> }</div>
                <Progress className="audio-progress" percent={30} size="small" showInfo={false} strokeWidth={5}/>
            </div>
            <div className="audio-name">音频名称{this.props.model.id}</div>
            <div className="audio-detail">mp4 450K 12::45:36</div>
            <style>{`
                .audio-item{
                    width: 147px;
                    height: 70px;
                    margin: 16px;
                    background: rgba(45,75,80,0.80);
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
                .audio-name{
                    font-size: 12px;
                    color: #fff;
                    text-indent: 8px;
                    margin-top: 8px;
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
            `}</style>
        </div>
    }
    onAudioPlayClick = () => {
        this.setState({
            play: !this.state.play
        });
    }
}

export default AddMaterial;