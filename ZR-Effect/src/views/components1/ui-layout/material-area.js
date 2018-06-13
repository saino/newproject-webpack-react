import React, { Component } from "react";
import MaterialBtn from "./material-btn";
import AddImg from "../../statics/add.png";
import DragList from 'react-draggable-list'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeWorkMaterial } from "../../../stores/reducers/work";
class MaterialArea extends Component {
    onMoveEnd = (newArr, movedItem, oldIndex, newIndex) => {
        const newWorkMaterials = newArr.map((item,index)=>{
            item.order = index +1;
            return item;
        });
        this.props.changeWorkMaterial(newWorkMaterials);
        
    }
    render() {
        const { materials } = this.props;
        const list = materials.map((material, index)=>{
            return {...material, index: index}
        });
        return <div className="material-area">
            <div className="add-material" onClick={this.addMaterialClick}>素材<div><img src={AddImg} /></div></div>
            <div className="drag-list">
                <DragList list={list} itemKey="id" template={MaterialBtn} padding={0} onMoveEnd={this.onMoveEnd} />
            </div>
            <style>{`
                .material-area{
                    // height: 574px;
                    height: calc(100% - 126px);
                    width: 160px;
                    background: #264246;
                    z-index: 1;
                }
                .add-material{
                    height: 40px;
                    width: 160px;
                    padding: 0 16px;
                    font-size: 14px;
                    line-height: 40px;
                    background: rgba(89,154,157,0.40);
                    display: flex;
                    cursor: pointer;
                    justify-content: space-between;
                }
                .add-material img{
                    margin-right: 0px;
                }
                .drag-list{
                    height: 534px;
                    overflow-x: hidden;
                    overflow-y: auto;
                }
            `}</style>
        </div>
    }
    addMaterialClick = () =>{
        this.props.changeaActiveContainer("material", ["video", "image"]);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeWorkMaterial: bindActionCreators(changeWorkMaterial, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(MaterialArea);