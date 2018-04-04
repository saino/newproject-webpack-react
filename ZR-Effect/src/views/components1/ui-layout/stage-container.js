import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeWork } from "../../../stores/reducers/work";

import aaaVideo from "../../statics/aaa.mp4";

class StageContainer extends Component {


    constructor(){
        super();
        console.log(this);
        this.state = {
            work: {}
        };
    }
    componentWillMount() {
        this.setState({
            work: {...this.props.work1}
        });
    }

    render() {
        console.log(this.props, "ddddd", this.state);
        const { work } = this.state;
        return <canvas className="background-stage">
            {/* <canvas className="canvas-stage" style={{height: 400, width: 800}}></canvas> */}
            {/* StageContainer */}
            <style>{`
                .background-stage{
                    height: 100%;
                    width: 100%;
                    background: #fff;
                }
                .canvas-stage{
                    background: grey;
                }
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