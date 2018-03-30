import React, { Component } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import VideoMaterial from "./video-material";
import "./audio-container.css";
import AddMaterial from "../../statics/add-material1.png";

class MaterialContainer extends Component {
    getVideoMaterial() {
        const { material } = this.props;
        return material.reduce((videoMaterial, materialItem) => {
            if (materialItem.type === 'video' || materialItem.type === "image") {
                videoMaterial.push(materialItem); 
            }
            return videoMaterial;
        }, []);
    }
    render() {
        return <div className="material-container">
            <div className="title-name">我的素材</div>
            <div className="material-content">
                <div className="video-item add-video" onClick={this.onAddMaterialClick}>
                    <img src={AddMaterial} />
                </div>
                {
                    this.getVideoMaterial().map((material) => {
                        return <VideoMaterial key={material.id} model={material} />
                    })
                }
            </div>
            <style>{`
                .material-container{
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
                .material-content{
                    padding: 0 3px 16px;
                    height: calc(100% - 56px);
                    width: 100%;
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: flex-start;
                    overflow-x: hidden;
                    overflow-y: auto;
                }
                .add-video{
                    cursor: pointer;
                }
                
            `}</style>
        </div>
    }
    onAddMaterialClick = () => {
        console.log("上传素材");
    }
}

const mapStateToProps = ({ material }) => {
    return {
        material
    };
}


export default connect(mapStateToProps)(MaterialContainer);