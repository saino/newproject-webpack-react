import React, { Component } from "react";
import ClassNames from "classnames"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeWorkMaterial } from '../../../stores/reducers/work'
import config from "../../../config";
import DeleImg from "../../statics/dele.png";
// import VideoImg from "../../statics/pic.png";
// import AudioImg from "../../statics/audio.png";
// import DeleImg from "../../statics/dele.png";

class VideoItem extends Component {
    render() {
        const { dragHandle } = this.props;
        // const icon = this.props.item.type == "audio" ? AudioImg : VideoImg;
        // const materialClass = ClassNames({ "material-btn": true, "active": this.props.item.active });
        // const lineClass = ClassNames({ "bottom-line": true, "active": this.props.item.active });
        const video = this.props.item;
        return <div>
            {
                dragHandle(<div className="time-video-item" style={{ width: `${video.properties.length * 5}px` }}>
                    <img className="time-video-item-thumb" src={`${config.fileUpload.host}:${config.fileUpload.port}${config.proxyTarget.path}/materials/${video.materialId}/thumb.jpg`} />
                    <div className="time-video-item-name">{video.name}</div>
                    <img className="time-video-item-delete" src={DeleImg} />
                </div>)
            }
            <style>{`
                .time-video-item{
                    height: 40px;
                    margin-right: 1px;
                    display: flex;
                    border: solid 1px #3A666A;
                }
                .time-video-item-thumb{
                    height: 38px;
                    width: 40px;
                    margin-right: 10px;
                }
                .time-video-item-name{
                    height: 38px;
                    line-height: 38px;
                    font-size: 12px;
                    color: #C4BF97;
                    flex: 1;
                }
                .time-video-item-delete{
                    height: 12px;
                    width: 12px;
                    float: right;
                    margin-right: 14px;
                    margin-top: 14px;
                    cursor: pointer;
                }
            `}</style>
        </div>;
    }
    onDeleMaterialClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { work, item } = this.props;
        // const { item } =
        let materials = work.config.materials.reduce((materials, materialItem, index) => {
            if (materialItem.id !== item.id) {
                materials.push(materialItem);
            }
            return materials
        }, []);
        this.props.changeWorkMaterial(materials);
    }
    onMaterialClick = () => {
        const { work, item } = this.props;
        let materials = work.config.materials.map((materialItem, index) => {
            materialItem.active = false;
            if (materialItem.id === item.id) {
                materialItem.active = true;
            }
            return materialItem;
        });
        this.props.changeWorkMaterial(materials);
    }
}

const mapStateToProps = ({ work }) => {
    return {
        work
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeWorkMaterial: bindActionCreators(changeWorkMaterial, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoItem);
