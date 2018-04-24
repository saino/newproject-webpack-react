import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import HeaderNav from "./components1/ui-layout/header-nav"
import Header from '../components/containers/Header/Header';

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
            materialContainerType: ["video", "image"]
        }
    }

    render(){
        const { video, material, workName } = this.props.work1;
        return (
            <div className="warp">
                {/* <HeaderNav/> */}
                {/* 头部导航 */}
                <div className="header">
                    <Header
                        onOpenLogin={() => this.configureDialogHandle('Login', true)}
                        onOpenRegister={() => this.configureDialogHandle('Register', true)} />
                </div>
                <Container>
                    <div className="container-layout"> 
                        <MaterialArea material={material} changeaActiveContainer={this.changeaActiveContainer}></MaterialArea>
                        <StageArea>
                            {this.renderContainer()}
                        </StageArea>
                        <OperationArea changeaActiveContainer={this.changeaActiveContainer}></OperationArea>
                        <EditArea material={material}></EditArea>
                    </div>
                    <TimeArea changeaActiveContainer={this.changeaActiveContainer}></TimeArea>
                </Container>
                
                {/* <div></div> */}
                <style>{`
                    .container-layout{
                        display: flex;
                        flex-wrap: wrap;
                    }
                    .header {
                        position: relative;
                        height: 50px;
                        z-index: 1;
                        background-image: radial-gradient(ellipse farthest-corner at 50% 1450%, #00141a, #010104);
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
                return <MaterialContainer materialContainerType={this.state.materialContainerType} changeaActiveContainer={this.changeaActiveContainer} />;
            case "audio":
                return <AudioContainer changeaActiveContainer={this.changeaActiveContainer} />;
            default:
                return <StageContainer />;
        }
    }
    changeaActiveContainer = (containerName, containerType) => {
        this.setState({
            activeContainer: containerName,
            materialContainerType: containerType
        });
    }
}

const mapStateToProps = ({ work1 }) => {
    return {
        work1
    };
}

export default connect(mapStateToProps)(SpecialEffec);