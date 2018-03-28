import React, {Component} from "react";

class VideoMaterial extends Component {
    render(){
        return <div className="video-item">
            <div className="video-thumb"></div>
            <div className="video-name">这里是作品名称{this.props.model.id}</div>
            <div className="video-detail">mp4 24K 12:13:00</div>
            <div></div>
            <style>{`
                .video-item{
                    height: 154px;
                    width: 147px;
                    margin: 16px;
                    background: rgba(45,75,80,0.80);
                }
                .video-thumb{
                    height: 110px;
                    width: 100%;
                    background: #000;
                }
                .video-name{
                    font-size: 12px;
                    color: #fff;
                    text-indent: 8px;
                    margin-top: 8px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .video-detail{
                    font-size: 10px;
                    color: #818B8A;
                    text-indent: 8px;
                }
            `}</style>
        </div>
    }
}

export default VideoMaterial;