import React, {Component} from "react";
import ClassNames from "classnames"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeMaterial } from '../../../stores/reducers/work';

import VideoImg from "../../statics/pic.png";
import AudioImg from "../../statics/audio.png";
import DeleImg from "../../statics/dele.png";

class MaterialBtn extends Component {
    render(){
        const icon =  this.props.model.type == "audio" ? AudioImg : VideoImg;
        const materialClass = ClassNames({"material-btn": true, "active": this.props.model.active});
        const lineClass = ClassNames({"bottom-line": true, "active": this.props.model.active});
        return <div className={materialClass} onClick={this.onMaterialClick}>
            <div className="thum-warp">
                <div className="thum-icon"><img src={icon} /> </div>
                {this.props.model.name}
            </div>
            {
                this.props.model.active ? <div><img src={DeleImg}/></div> : null
            }
            <div className={lineClass}/>
            <style>{`
                .material-btn{
                    height: 40px;
                    width: 160px;
                    padding: 0 16px;
                    font-size: 14px;
                    line-height: 40px;
                    display: flex;
                    cursor: pointer;
                    justify-content: space-between;
                    color: #fff;
                    position: relative;
                }
                .bottom-line{
                    position: absolute;
                    width: 100%;
                    height: 1px;
                    background: #0D1D21;
                    left: 0;
                    bottom: 0;
                }
                .bottom-line.active{
                     background-image: linear-gradient(-269deg, rgba(146,202,204,0.40) 0%, rgba(109,170,173,0.99) 32%, #6DABAE 64%, rgba(88,153,157,0.40) 100%);
                }
                .active{
                    background: #0D1D21;
                }
                .thum-warp{
                    display: flex;
                }
                .thum-icon{
                    height: 12px;
                    width: 12px;
                    margin-right: 8px;
                }
            `}</style>
        </div>
    }
    onMaterialClick = () => {
        const {work1, model} = this.props;
        var material = work1.material.map((materialItem, index)=>{
            materialItem.active = false;
            if(materialItem.id===model.id){
                materialItem.active = true;
            }
            return materialItem;
        });
        work1.material = material;
        this.props.changeMaterial(material);
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialBtn);