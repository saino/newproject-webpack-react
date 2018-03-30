import React, { Component } from "react";
import { Icon, Progress  } from "antd";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import work, { changeWorkMaterial } from '../../../stores/reducers/work';
import { changeMaterial } from '../../../stores/reducers/material'

import dongfengpo from '../../statics/dongfengpo.mp3';

class AddMaterial extends Component {
    constructor(){
        super();
        this.state = {
            play: false,
            showUse: false
        }
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
    render () {
        const useClass = "audio-use " + (this.state.showUse ? "show" : "hide");
        return <div className="audio-item" onMouseOver={this.onShowUse} onMouseOut={this.onHideUse}>
            <div className="audio-control">
                <div className="audio-play" onClick={this.onAudioPlayClick}>{this.state.play ? <Icon type="pause" /> : <Icon type="caret-right" /> }</div>
                <Progress className="audio-progress" percent={30} size="small" showInfo={false} strokeWidth={5}/>
            </div>
            <div className="name-edit" onMouseOver={this.onNameMouseOver}>
                <div className="audio-name">音频名称{this.props.model.id}</div>
                <div className="audio-detail">mp4 450K 12::45:36</div>
                <audio ref="audio" style={{display:"none"}} src={dongfengpo} controls/>
            </div>
            <div className={useClass}>
                {/* <div className="use-item" onClick={this.onPreViewClick}>预览</div> */}
                <div className="use-item" onClick={this.onUseClick}>使用</div>
                <div className="use-item" onClick={this.onDeleClick}>删除</div>
            </div>
            <style>{`
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
    onNameMouseOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    onUseClick = () => {
        const { model, work1 } = this.props;
        let materialItem = {
            ...model,
            materialId: model.id,
            id: new Date().getTime(),
            order: 10,

            timeEnd: {
                hour: "",
                minute: "",
                second: "",
                millisecond: "",
            },
            active: false,
            timeStart: {
                hour: "",
                minute: "",
                second: "",
                millisecond: "",
            }
        }
        work1.material.push(materialItem);
        this.props.changeWorkMaterial(work1.material);
    }
    onDeleClick = () => {
        const {material, model} = this.props;
        const temMaterial = material.reduce((temMaterial, materialItem)=>{
            if(materialItem.id === model.id){
                return temMaterial;
            }
            temMaterial.push(materialItem);
            return temMaterial;
        }, []);
        this.props.changeMaterial(temMaterial);
    }
    onAudioPlayClick = () => {
        if(this.state.play){
            this.refs.audio.pause();
        }else{
            this.refs.audio.play()
        };
        this.setState({
            play: !this.state.play
        });
    }
}

const mapStateToProps = ({ material, work1}) => {
    return {
        material,
        work1
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeMaterial: bindActionCreators(changeMaterial, dispatch),
        changeWorkMaterial: bindActionCreators(changeWorkMaterial, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMaterial);