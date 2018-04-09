import React, { Component } from "react";
import PreFrame from "../../statics/preframe.png";
import Play from "../../statics/play.png";
import NextFrame from "../../statics/nextframe.png";
import AddImg from "../../statics/add.png";

class TimeArea extends Component {
    render() {
        return <div className="time-area">
            <div className="time-control">
                <div className="control-video">
                    <div><img src={PreFrame} /> </div>
                    <div className="control-play"><img src={Play} /> </div>
                    <div><img src={NextFrame} /> </div>
                </div>
                <div onClick={this.onAddVideoClick} className="add-video"><img src={AddImg}/>添加视频</div>
            </div>
            <style>{`
                .time-area{
                    height: 126px;
                    width: calc(100% - 240px);
                    background: rgba(14,27,32,1);
                    margin-top: -126px;
                    position: relative;
                    z-index: 1;
                }
                .time-control{
                    width: 100%;
                    height: 37px;
                    padding: 0 32px;
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
            `}</style>
        </div>
    }
    onAddVideoClick = () => {
        this.props.changeaActiveContainer("material", ["video"]);
    }
}
export default TimeArea;