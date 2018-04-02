import React, {Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeWorkMaterial } from '../../../stores/reducers/work';
import { changeMaterial } from '../../../stores/reducers/material'

import AlertView from "./alert-view";
// import video1 from '../../statics/aaa.mp4';
// import aaa from "../../statics/aaa.png";
import PreView from "./pre-view"
// import {ClassNames} from "class-name"

class VideoMaterial extends Component {
    constructor(){
        super();
        this.state = {
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
    render(){
        const useClass = "video-use " + (this.state.showUse ? "show" : "hide");
        return <div className="video-item" onMouseOver={this.onShowUse} onMouseOut={this.onHideUse}>
            <div className="video-thumb"></div>
            <div className="name-edit" onMouseOver={this.onNameMouseOver}>
                <div className="video-name">这里是作品名称{this.props.model.id}</div>
                <div className="video-detail">mp4 24K 12:13:00</div>
            </div>
            <div className={useClass}>
                <div className="use-item" onClick={this.onPreViewClick}>预览</div>
                <div className="use-item" onClick={this.onUseClick}>使用</div>
                <div className="use-item" onClick={this.onDeleClick}>删除</div>
            </div>
            <style>{`
                .video-item{
                    position: relative;
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
                .name-edit{
                    padding-top: 8px;
                    height: 44px;
                }
                .video-name{
                    font-size: 12px;
                    color: #fff;
                    text-indent: 8px;
                    // margin-top: 8px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .video-detail{
                    font-size: 10px;
                    color: #818B8A;
                    text-indent: 8px;
                }
                .video-use{
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
    onPreViewClick = () => {
        AlertView.render(<PreView model={this.props.model} />);
    }
    onUseClick = () => {
        let materialItem = {
            ...this.props.model,
            materialId: this.props.model.id,
            id: new Date().getTime(), 
            order: 10, 
            positionX: 0,
            positionY: 0,
            rotateZ: 0,
            width: 100,
            height: 100,
            control: [
                { x: "", y: "" },
                { x: "", y: "" },
                { x: "", y: "" },
                { x: "", y: "" },
            ],
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
        };
        const {material} = this.props.work1
        material.push(materialItem);
        this.props.changeWorkMaterial(material);
    }
    onDeleClick = () => {
        const { material, model } = this.props;
        const temMaterial = material.reduce((temMaterial, materialItem1)=>{
            if(materialItem1.id === model.id){
                return temMaterial;
            }
            temMaterial.push(materialItem1);
            return temMaterial;
        }, []);
        this.props.changeMaterial(temMaterial);
    }
}

const mapStateToProps = ({work1, material}) => {
    return {
        work1,
        material
    };
} 

const mapDispatchToProps = (dispatch) => {
    return {
        changeWorkMaterial: bindActionCreators(changeWorkMaterial, dispatch),
        changeMaterial: bindActionCreators(changeMaterial, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoMaterial);