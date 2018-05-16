import React, {Component} from "react";
import ClassNames from "classnames"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeWorkMaterial } from '../../../stores/reducers/work'

import VideoImg from "../../statics/pic.png";
import AudioImg from "../../statics/audio.png";
import DeleImg from "../../statics/dele.png";

class MaterialBtn extends Component {
    render(){
        // console.log(this, "kkkkkkkkkkkkk");
        const { dragHandle } = this.props;
        const icon =  this.props.item.type == "audio" ? AudioImg : VideoImg;
        const materialClass = ClassNames({"material-btn": true, "active": this.props.item.active});
        const lineClass = ClassNames({"bottom-line": true, "active": this.props.item.active});
        // return <div className={materialClass} onClick={this.onMaterialClick}>
        //     {dragHandle(<div>
        //         <div className="thum-warp">
        //             <div className="thum-icon"><img src={icon} /> </div>
        //             {this.props.item.name}
        //         </div>
        //         {
        //             this.props.item.active ? <div onClick={this.onDeleMaterialClick}><img src={DeleImg} /></div> : null
        //         }
        //         < div className = { lineClass } />
        //     </div>)}
        //     {/* <div className="thum-warp">
        //         <div className="thum-icon"><img src={icon} /> </div>
        //         {this.props.item.name}
        //     </div>
        //     {
        //         this.props.item.active ? <div onClick={this.onDeleMaterialClick}><img src={DeleImg}/></div> : null
        //     }
        //     <div className={lineClass}/> */}
        //     <style>{`
        //         .material-btn{
        //             height: 40px;
        //             width: 160px;
        //             padding: 0 16px;
        //             font-size: 14px;
        //             line-height: 40px;
        //             display: flex;
        //             cursor: pointer;
        //             justify-content: space-between;
        //             color: #fff;
        //             position: relative;
        //         }
        //         .bottom-line{
        //             position: absolute;
        //             width: 100%;
        //             height: 1px;
        //             background: #0D1D21;
        //             left: 0;
        //             bottom: 0;
        //         }
        //         .bottom-line.active{
        //              background-image: linear-gradient(-269deg, rgba(146,202,204,0.40) 0%, rgba(109,170,173,0.99) 32%, #6DABAE 64%, rgba(88,153,157,0.40) 100%);
        //         }
        //         .active{
        //             background: #0D1D21;
        //         }
        //         .thum-warp{
        //             display: flex;
        //             overflow: hidden;
        //             white-space: nowrap;
        //             text-overflow: ellipsis;
        //         }
        //         .thum-icon{
        //             height: 12px;
        //             width: 12px;
        //             margin-right: 8px;
        //         }
        //     `}</style>
        // </div>
        return <div>
            {
                dragHandle(<div className={materialClass} onClick={this.onMaterialClick}>
                    <div className="thum-warp">
                        <div className="thum-icon"><img src={icon} /> </div>
                        {this.props.item.name}
                    </div>
                    {
                        this.props.item.active ? <div onClick={this.onDeleMaterialClick}><img src={DeleImg} /></div> : null
                    }
                    < div className={lineClass} />
                </div>)
            }
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
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .thum-icon{
                    height: 12px;
                    width: 12px;
                    margin-right: 8px;
                }
            `}</style>
        </div>;
    }
    onDeleMaterialClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const {work, item} = this.props;
        // const { item } =
        let materials = work.config.materials.reduce((materials, materialItem, index)=>{
            if(materialItem.id!==item.id){
                materials.push(materialItem);
            }
            return materials
        }, []);
        this.props.changeWorkMaterial(materials);
    }
    onMaterialClick = () => {
        const {work, item} = this.props;
        let materials = work.config.materials.map((materialItem, index)=>{
            materialItem.active = false;
            if(materialItem.id===item.id){
                materialItem.active = true;
            }
            return materialItem;
        });
        this.props.changeWorkMaterial(materials);
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialBtn);
