import React, { Component } from "react";
import MaterialBtn from "./material-btn";
import AddImg from "../../statics/add.png"
class MaterialArea extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            materialOfWork: [
                { type: "audio", name: "音频", active: false },
                { type: "video", name: "素材1", active: true },
                { type: "video", name: "素材2", active: false },
                { type: "video", name: "素材3", active: false },
                { type: "video", name: "素材4", active: false },
            ]
        }
    }
    render() {
        // console.log(this.props.material);
        const { material } = this.props;
        return <div className="material-area">
            {/* MaterialArea */}
            <div className="add-material">素材<div><img src={AddImg} /></div></div>
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
}
export default MaterialArea;