import React, {Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeWorkMaterial, changWorkVideo } from '../../../stores/reducers/work';
// import { changeMaterial,  } from '../../../stores/reducers/material'
import { changeMaterial, loadMaterials, deleteMaterial } from "../../../stores/reducers/material"
import { loadVideoMaterials } from '../../../stores/reducers/video-mateiral'
import { setVideoAndImgLibPage, setVideoLibPage } from "../../../stores/reducers/pagination"

import AlertView from "./alert-view";
import config from "../../../config";
import PreView from "./pre-view";
import moment from 'moment';

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
    showTime = () => {
        const { model } = this.props;
        const { properties } = model;
        if(model.type === "image"){
            return "";
        }

        const formatTime = moment.duration(properties.duration * 1000);
        return `${formatTime.hours() < 10 ? "0" + formatTime.hours() : formatTime.hours()} :
                ${formatTime.minutes() < 10 ? "0" + formatTime.minutes() : formatTime.minutes()} :
                ${formatTime.seconds() < 10 ? "0" + formatTime.seconds() : formatTime.seconds()}`;

    }
    render(){
        const { model } = this.props;
        const { properties } = model;
        const formatTime = moment.duration(properties.duration*1000);
        const useClass = "video-use " + (this.state.showUse ? "show" : "hide");
        return <div className="video-item" onMouseOver={this.onShowUse} onMouseOut={this.onHideUse}>
            <div className="video-thumb">
                <img src={`${config.fileUpload.host}:${config.fileUpload.port}${config.proxyTarget.path}/materials/${model.id}/thumb.jpg`}/>
            </div>
            <div className="name-edit" onMouseOver={this.onNameMouseOver}>
                <div className="video-name">{model.name}</div>
                <div className="video-detail">{`
                    ${properties.format} 
                    ${Math.round(properties.filesize / 1024)}K 
                    ${this.showTime()}
            `}</div>
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
                .video-item:hover {
                    box-shadow: 0 0 9px 6px rgba(255,255,255,0.50);
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
        const { useType } = this.props;
        
        //为作品添加素材
        if(useType.indexOf("image")>=0){
            const materials = this.props.work.config.materials.map((material) => {
                material.active = false;
                return material;
            });
            let materialItem = {
                ...this.props.model,
                materialId: this.props.model.id,
                id: new Date().getTime(), 
                order: materials.length+1, 
                positionX: 0,
                positionY: 0,
                rotateZ: 0,
                width: 100,
                height: 100,
                control: [
                    { x: 0, y: 0 },
                    { x: this.props.model.properties.width, y: 0 },
                    { x: this.props.model.properties.width, y: this.props.model.properties.height },
                    { x: 0, y: this.props.model.properties.height },
                ],
                scaleReferenceControl:[
                    { x: 0, y: 0 },
                    { x: this.props.model.properties.width, y: 0 },
                    { x: this.props.model.properties.width, y: this.props.model.properties.height },
                    { x: 0, y: this.props.model.properties.height },
                ],
                timeEnd: {
                    hour: "",
                    minute: "",
                    second: "",
                    millisecond: "",
                },
                active: true,
                timeStart: {
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0,
                }
            };
            
            materials.push( materialItem );
            this.props.changeWorkMaterial(materials);
        }else{  //为作品添加主视频
            const { videos } = this.props.work.config;
            let materialItem = {
                ...this.props.model,
                materialId: this.props.model.id,
                id: new Date().getTime(),
                order: videos.length+1,
                positionX: 0,
                positionY: 0,
            }
            videos.push(materialItem);
            this.props.changWorkVideo(videos);
        }
        this.props.changeaActiveContainer("stage", ["video", "image"]);
    }
    onDeleClick = () => {
        const { model, useType, pagination } = this.props;
        this.props.deleteMaterial(model, ()=>{
            const types = useType.join("|");
            if (useType.indexOf("image") >= 0) {
                this.props.loadMaterials({
                    "types": types,
                    "page": pagination.videoAndImgLibPage,
                    "perpage": config.page.size,
                });
            } else {
                this.props.loadVideoMaterials({
                    "types": types,
                    "page": pagination.videoLibPage,
                    "perpage": config.page.size,
                });
            }
        });
    }
}

const mapStateToProps = ({work, material, pagination}) => {
    return {
        work,
        material,
        pagination,
    };
} 

const mapDispatchToProps = (dispatch) => {
    return {
        changeWorkMaterial: bindActionCreators(changeWorkMaterial, dispatch),
        changeMaterial: bindActionCreators(changeMaterial, dispatch),
        changWorkVideo: bindActionCreators(changWorkVideo, dispatch),
        deleteMaterial: bindActionCreators(deleteMaterial, dispatch),
        loadMaterials: bindActionCreators(loadMaterials, dispatch),
        loadVideoMaterials: bindActionCreators(loadVideoMaterials, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoMaterial);