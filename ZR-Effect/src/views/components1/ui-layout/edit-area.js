import React, {Component} from "react";
import { Icon, InputNumber, Input, Radio, Button } from "antd"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from "moment";
import TimeControl from './time-control';

import { changeWorkMaterial } from '../../../stores/reducers/work'

class EditArea extends Component{

    getcurrentmaterial() {
        const { work } = this.props;
        const { materials } = work.config;
        const currentMaterial = materials.filter(materialItem => materialItem.active)[0];
        return currentMaterial;
    }
    render(){
        return <div className="edit-area">
            <div className="edit-title">功能栏</div>
            <div className="edit-content">
                {this.renderControlMaterial()}
            </div>
            <style>{`
                .edit-area{
                    height: 700px;
                    width: 240px;
                    background: rgba(38,66,70,1);
                    z-index: 1;
                }
                .edit-title{
                    height: 40px;
                    width: 240px;
                    background: rgba(58,104,108,1);
                    color: rgba(196,191,151,1);
                    font-size: 14px;
                    text-align: center;
                    line-height: 40px;
                }
                .audio-loop{
                    height: 55px;
                    color: #C4BF97;
                    font-size: 14px;
                    line-height: 55px;
                    padding-left: 16px;
                    display: flex;
                    border-bottom: solid 1px rgba(0,0,0,0.2);
                }
                .isloop{
                    height: 20px;
                    width: 20px;
                    margin-left: 16px;
                    background: #3A686C;
                    margin-top: 19px;
                    text-align: center;
                    line-height: 19px;
                    color: #fff;
                    cursor: pointer;
                }
                .control{
                    display: flex;
                    // padding-left: 16px;
                    margin-top: 16px;
                    color: rgba(196,191,151,1);
                    justify-content: space-around;
                }
                .controlz{
                    padding-left: 16px;
                    display: flex;
                    margin-top: 16px;
                    color: rgba(196,191,151,1);
                }
                .input-number-warp{
                    display: flex;
                }
                .input-number{
                    width: 64px;
                    margin-left: 16px;
                    outline: none;
                    border: none;
                    list-style: none;
                    height: 26px;
                    padding-left: 6px;
                    background: #3A686C;
                    border-radius: 0;
                }
                .input-number input{
                    width: 100%;
                    border: none;
                    line-height: 26px;
                }
            `}</style>
        </div>
    }
    renderControlMaterial(){
        const currentMaterial = this.getcurrentmaterial();
        if (!currentMaterial || !currentMaterial.active){
            return null;
        }
        if (currentMaterial.type === "audio"){
            return this.audioControl();
        } else if(currentMaterial.type === "image"){
            return this.imageControl();
        } else if(currentMaterial.type === 'video'){
            return this.videoControl();
        }
    }
    audioControl() {
        const currentMaterial = this.getcurrentmaterial();
        const { duration } = this.props.work.config.properties;
        return (<div>
            <div className="audio-loop">
                循环播放 
                <div className="isloop" onClick={this.onChangeLoop}> 
                    { currentMaterial.loop ?  <Icon type="check" /> : null }
                </div>
            </div>
            <TimeControl key={currentMaterial.id} currentMaterial={currentMaterial} duration={duration} timeStart={currentMaterial.timeStart} timeEnd={currentMaterial.timeEnd}/>
        </div>)
    }
    onChangeLoop = () => {
        const currentMaterial = this.getcurrentmaterial();
        currentMaterial.loop = !currentMaterial.loop;
        this.props.changeWorkMaterial(currentMaterial);
    }
    imageControl() {
        const currentMaterial = this.getcurrentmaterial();
        const { duration } = this.props.work.config.properties;
        return (<div>
            <div className="control">
                <div className="input-number-warp">宽<InputNumber className="input-number" min={0} value={currentMaterial.width} onChange={this.onWorkPropChange("width")}/></div>
                <div className="input-number-warp">高<InputNumber className="input-number" min={0} value={currentMaterial.height} onChange={this.onWorkPropChange("height")}/></div>
            </div>
            <div className="controlz">
                <div className="input-number-warp">旋转 <InputNumber className="input-number" value={currentMaterial.rotateZ} onChange={this.onWorkPropChange("rotateZ")}/> </div>
            </div>
            <div className="control">
                <div className="input-number-warp">X<InputNumber className="input-number" min={0} value={currentMaterial.positionX} onChange={this.onWorkPropChange("positionX")}/></div>
                <div className="input-number-warp">Y<InputNumber className="input-number" min={0} value={currentMaterial.positionY} onChange={this.onWorkPropChange("positionY")}/></div>
            </div>
            <TimeControl key={currentMaterial.id} currentMaterial={currentMaterial} duration={duration} timeStart={currentMaterial.timeStart} timeEnd={currentMaterial.timeEnd} />
        </div>)
    }
    videoControl() {
        const currentMaterial = this.getcurrentmaterial();
        const { duration } = this.props.work.config.properties;
        return (<div>
            <div className="control">
                <div className="input-number-warp">宽<InputNumber className="input-number" min={0} value={currentMaterial.width} onChange={this.onWorkPropChange("width")} /></div>
                <div className="input-number-warp">高<InputNumber className="input-number" min={0} value={currentMaterial.height} onChange={this.onWorkPropChange("height")} /></div>
            </div>
            <div className="controlz">
                <div className="input-number-warp">旋转 <InputNumber className="input-number" value={currentMaterial.rotateZ} onChange={this.onWorkPropChange("rotateZ")} /> </div>
            </div>
            <div className="control">
                <div className="input-number-warp">X<InputNumber className="input-number" min={0} value={currentMaterial.positionX} onChange={this.onWorkPropChange("positionX")} /></div>
                <div className="input-number-warp">Y<InputNumber className="input-number" min={0} value={currentMaterial.positionY} onChange={this.onWorkPropChange("positionY")} /></div>
            </div>
            <TimeControl key={currentMaterial.id} currentMaterial={currentMaterial} duration={duration} timeStart={currentMaterial.timeStart} timeEnd={currentMaterial.timeEnd} />
        </div>)
    }
    onWorkPropChange(prop){
        return (value) => {
            if (value == undefined || isNaN(value)) { return; }
            const currentMaterial = this.getcurrentmaterial();
            if (prop === "positionX"){
                for(let i=0; i<4; i++){
                    currentMaterial.control[i].x += value - currentMaterial[prop];
                }
            }
            if (prop === "positionY"){
                for(let i=0; i<4; i++){
                    currentMaterial.control[i].y += value - currentMaterial[prop];
                }
            }

            currentMaterial[prop] = value;
            this.props.changeWorkMaterial(currentMaterial);
        }
    }
}

const mapStateToProps = ({work}) => {
    return {
        work
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeWorkMaterial: bindActionCreators(changeWorkMaterial, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditArea);