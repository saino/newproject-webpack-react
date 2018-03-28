import React, {Component} from "react";
import { connect} from "react-redux"
import { bindActionCreators } from 'redux';
import AudioMaterial from "./audio-material";
import "./audio-container.css";
import AddMaterial from "../../statics/add-material.png";

class AudioContainer extends Component {

    constructor() {
        super();
        
    }
    getAudioMaterial(){
        const { material } = this.props;
        return material.reduce((audioMaterial, materialItem)=>{
            if(materialItem.type==='audio'){
                audioMaterial.push(materialItem);0
            }
            return audioMaterial;
        }, []);
    }
    render() {
        return <div className="audio-container">
            <div className="title-name">我的音频</div>
            <div className="audio-content">
                <div className="audio-item add-audio" onClick={this.onAddMaterialClick}>
                    <img src={AddMaterial}/>
                </div>
                {
                    this.getAudioMaterial().map((material)=>{
                        return <AudioMaterial key={material.id} model={material} />
                    })
                }
                {/* <AudioMaterial/> */}
            </div>
            <style>{`
                .audio-container{
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
                .audio-content{
                    padding: 0 3px 16px;
                    height: calc(100% - 56px);
                    width: 100%;
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: flex-start;
                    overflow-x: hidden;
                    overflow-y: auto;
                }
                .add-audio{
                    cursor: pointer;
                }
                
            `}</style>
        </div>
    }
    onAddMaterialClick = () =>　{
        alert("上传音频")
    }

}

const mapStateToProps = ({material}) => {
    return {
        material
    };
}

export default connect(mapStateToProps)(AudioContainer);