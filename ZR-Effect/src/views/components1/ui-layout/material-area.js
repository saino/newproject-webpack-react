import React, { Component } from "react";
import MaterialBtn from "./material-btn";
import AddImg from "../../statics/add.png"
class MaterialArea extends Component {

    render() {
        const { material } = this.props;
        return <div className="material-area">
            <div className="add-material" onClick={this.addMaterialClick}>素材<div><img src={AddImg} /></div></div>
            {
                material.map((model, index) => {
                    return <MaterialBtn key={index} model={model}/>
                })
            }
            <style>{`
                .material-area{
                    height: 574px;
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
            `}</style>
        </div>
    }
    addMaterialClick = () =>{
        // console.log("添加素材");
        this.props.changeaActiveContainer("material", ["video", "image"]);
    }
}
export default MaterialArea;