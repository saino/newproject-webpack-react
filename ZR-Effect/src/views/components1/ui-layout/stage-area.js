import React, { Component } from "react";
// import aaa from "../../statics/aaa.png"
class StageArea extends Component {
    render() {
        return <div className="stage-area">
            {/* <img className="stage" src={aaa}/> */}
            <style>{`
                .stage-area{
                    height: 574px;
                    width: calc(100% - 440px);
                    background: #666;
                }
                .stage{
                    // height: 
                }
            `}</style>
        </div>
    }
}
export default StageArea;