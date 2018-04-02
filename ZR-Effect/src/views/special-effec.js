import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import HeaderNav from "./components1/ui-layout/header-nav"
import Container from "./components1/ui-layout/container"
import MaterialArea from "./components1/ui-layout/material-area";
import StageArea from "./components1/ui-layout/stage-area";
import OperationArea from "./components1/ui-layout/operation-area";
import EditArea from "./components1/ui-layout/edit-area";
import TimeArea from "./components1/ui-layout/time-area";

import StageContainer from "./components1/ui-layout/stage-container";
import MaterialContainer from "./components1/ui-layout/material-container";
import AudioContainer from "./components1/ui-layout/audio-container";

class SpecialEffec extends Component {

    constructor(){
        super();
        this.state = {
            activeContainer: "stage",
        }
    }

    render(){
        const { video, material, workName } = this.props.work1;
        return (
            <div className="warp">
                <HeaderNav/>
                <Container>
                    <div className="container-layout"> 
                        <MaterialArea material={material} changeaActiveContainer={this.changeaActiveContainer}></MaterialArea>
                        <StageArea>
                            {this.renderContainer()}
                        </StageArea>
                        <OperationArea changeaActiveContainer={this.changeaActiveContainer}></OperationArea>
                        <EditArea material={material}></EditArea>
                    </div>
                    <TimeArea></TimeArea>
                </Container>
                
                {/* <div></div> */}
                <style>{`
                    .container-layout{
                        display: flex;
                        flex-wrap: wrap;
                    }
                `}</style>
            </div>
        );
    }
    renderContainer = () => {
        switch (this.state.activeContainer) {
            case "stage":
                return <StageContainer />;
            case "material":
                return <MaterialContainer />;
            case "audio":
                return <AudioContainer />;
            default:
                return <StageContainer />;
        }
    }
    changeaActiveContainer = (containerName) => {
        this.setState({
            activeContainer: containerName
        });
    }
}

const mapStateToProps = ({ work1 }) => {
    return {
        work1
    };
}

export default connect(mapStateToProps)(SpecialEffec);