import React, { Component } from "react";
import SaveImg from "../../statics/save.png";
import PubImg from "../../statics/pub.png";
import TransformImg from "../../statics/transform.png";

import CancelImg from "../../statics/cancel.png";
import ZoomInImg from "../../statics/zoomin.png";
import ZoomOutImg from "../../statics/zoomout.png";
import MoveImg from "../../statics/move.png";
import AlertView from "./alert-view";

class OperationArea extends Component {
    render() {
        return <div className="operation-area">
            <div className="operation-btn1"><img src={SaveImg}/><div>保存</div></div>
            <div className="operation-btn1" onClick={this.onPubClick}><img src={PubImg} /><div>发布</div></div>
            <div className="operation-bank"></div>
            <div className="operation-btn2" onClick={this.onMaterialLibClick}>素材库</div>
            <div className="operation-btn2" onClick={this.onAudioLibClick}>音频库</div>
            {/* <div className="operation-transform"><img src={TransformImg}/></div> */}
            <div className="operation-icons">
                <div><img className="operation-icon" src={CancelImg} /></div>
                <div><img className="operation-icon" src={MoveImg} /></div>
                <div><img className="operation-icon" src={ZoomInImg} /></div>
                <div><img className="operation-icon" src={ZoomOutImg} /></div>
                {/* <img className="operation-icon" src={MoveImg} />
                <img className="operation-icon" src={ZoomInImg} />
                <img className="operation-icon" src={ZoomOutImg} /> */}
            </div>
            <style>{`
                .operation-area{
                    position: relative;
                    height: 574px;
                    width: 40px;
                    background: rgba(13,29,33,1);
                    color: #fff;
                    font-size: 12px;
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
    onPubClick = () => {
        // console.log("ddddd");
        AlertView.render(<div>ddddddd</div>);
    }
    onMaterialLibClick = () => {
        this.props.changeaActiveContainer("material");
    }
    onAudioLibClick = () => {
        this.props.changeaActiveContainer("audio");
    }
}
export default OperationArea;