import React, { Component } from "react";
import { findDOMNode } from 'react-dom'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeWork } from "../../../stores/reducers/work";

import aaaVideo from "../../statics/aaa.mp4";
// import { createjs } from "yuki-createjs";
import 'yuki-createjs'

class StageContainer extends Component {

    constructor(){
        super();
        console.log(this);
        this.state = {
            work: {}
            
        };
    }
    componentWillMount() {
        // console.log(createjs, "dddddddxxxxxxxx");
        this.setState({
            work: {...this.props.work1}
        });
    }
    zoomInOrOut = () => {

    }
    componentDidMount() {
        // setTimeout(() => {
            let stageDom = findDOMNode(this.refs.stageCanvas);
            var stage = new createjs.Stage("mycanvas");
            console.log(stage);
            var container = new createjs.Container();
            stage.addChild(container);

            var shapeCircle = new createjs.Shape();
            shapeCircle.graphics.beginFill("#ff0000").drawCircle(20, 20, 20);
            container.addChild(shapeCircle);
            
            // stageDom.style.transform = "scale(1, 1.4)";
            // clip3.setStrokeStyle(1);
            // clip3.beginStroke("#000000");
            // clip3.drawCircle(100, 100, 50);
            // stage.scaleX = 1;
            // stage.scaleY = 3;
            stage.update();
        // }, 100);
        
        // console.log(new createjs.Stage("mycanvas"), "dddslllllllll");
    }
    render() {
        // console.log(this.props, "ddddd", this.state);
        // const { work } = this.state;
        const { work1 } = this.props;
        return <canvas style={{transform: `scale(${work1.scaleX},${work1.scaleY})`}} ref="stageCanvas" id="mycanvas" className="background-stage" width="800" height="400">
            {/* <canvas className="canvas-stage" style={{height: 400, width: 800}}></canvas> */}
            {/* StageContainer */}
            <style>{`
                .background-stage{
                    // height: 100%;
                    // width: 100%;
                    background: #fff;
                }
                // .canvas-stage{
                //     background: grey;
                // }
            `}</style>
        </canvas>
    }
}

const mapStateToProps = ({ work1 }) => {
    return {
        work1
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeWork: bindActionCreators(changeWork, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StageContainer);