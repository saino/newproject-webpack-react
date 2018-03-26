import React, {Component} from "react";
import "./audio-container.css";

class AudioContainer extends Component {
    render() {
        return <div className="audio-container">
            <div className="title-name">我的音频</div>
            <style>{`
                .audio-container{
                    height: 100%;
                    width: 100%;
                    background: #031016;
                }
                .title-name{
                    height: 40px;
                    width: 94px;
                    color: #818B8A;
                    font-size: 14px;
                    background: rgba(0,0,0,0.6);
                    text-align: center;
                    line-height: 40px;
                }
            `}</style>
        </div>
    }
}

export default AudioContainer;