import React, {Component} from "react";
import { Icon, InputNumber  } from "antd"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from "moment";
import TimeControl from './time-control';

import { changeMaterial } from '../../reducers/work1'

class EditArea extends Component{

    getCuurentmaterial() {
        const { work1 } = this.props;
        const { material } = work1;
        const currentMaterial = material.filter(materialItem => materialItem.active)[0];
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
            `}</style>
        </div>
    }
    renderControlMaterial(){
        const currentMaterial = this.getCuurentmaterial();
        if (!currentMaterial || !currentMaterial.active){
            return null;
        }
        if (currentMaterial.type === "audio"){
            return this.audioControl();
        } else{
            return this.imageControl();
        }
    }
    audioControl() {
        const currentMaterial = this.getCuurentmaterial();
        const { duration } = this.props.work1;
        return (<div>
            <div className="audio-loop">
                循环播放 
                <div className="isloop" onClick={this.onChangeLoop}> 
                    {currentMaterial.loop ?  <Icon type="check" /> : null} 
                </div>
            </div>
            <TimeControl currentMaterial={currentMaterial} duration={duration} timeStart={currentMaterial.timeStart} timeEnd={currentMaterial.timeEnd}/>
        </div>)
    }
    onChangeLoop = () => {
        const currentMaterial = this.getCuurentmaterial();
        currentMaterial.loop = !currentMaterial.loop;
        this.props.changeMaterial(currentMaterial);
    }
    imageControl() {
        const currentMaterial = this.getCuurentmaterial();
        const { duration } = this.props.work1;
        return (<div>
            {/* <div className=""> */}
            <div className="control">
                <div className="input-number-warp">宽<InputNumber className="input-number" min="0" /></div>
                <div className="input-number-warp">高<InputNumber className="input-number" min="0" /></div>
            </div>
            <div className="control">
                <div>旋转</div>
            </div>
            <div className="control">
                <div className="input-number-warp">X<InputNumber className="input-number" min="0" /></div>
                <div className="input-number-warp">Y<InputNumber className="input-number" min="0" /></div>
            </div>
            {/* </div> */}
            <TimeControl currentMaterial={currentMaterial} duration={duration} timeStart={currentMaterial.timeStart} timeEnd={currentMaterial.timeEnd} />
        </div>)
    }
}

const mapStateToProps = ({work1}) => {
    return {
        work1
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeMaterial: bindActionCreators(changeMaterial, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditArea);