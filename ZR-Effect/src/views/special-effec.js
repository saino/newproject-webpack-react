import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginPage from '../components/layouts/LoginPage/LoginPage';
import RegisterPage from '../components/layouts/RegisterPage/RegisterPage';

import { Modal } from 'antd';
import HeaderNav from "./components1/ui-layout/header-nav"
import Header from '../components/containers/Header/Header';
import config from '../config';

import Container from "./components1/ui-layout/container"
import MaterialArea from "./components1/ui-layout/material-area";
import StageArea from "./components1/ui-layout/stage-area";
import OperationArea from "./components1/ui-layout/operation-area";
import EditArea from "./components1/ui-layout/edit-area";
import TimeArea from "./components1/ui-layout/time-area";

import StageContainer from "./components1/ui-layout/stage-container";
import MaterialContainer from "./components1/ui-layout/material-container";
import AudioContainer from "./components1/ui-layout/audio-container";

// import { loadMaterials } from "../stores/reducers/material"
import { createWork, loadWork, changeWorkProperties } from "../stores/reducers/work";

class SpecialEffec extends Component {

    constructor(){
        super();
        this.state = {
            activeContainer: "stage",
            materialContainerType: ["video", "image"],
            isShowLoginDialog: false,
            isShowRegisterDialog: false
        };

        this.configureDialogHandle = (key, isShowDialog) =>
            this.setState({ [`isShow${key}Dialog`]: isShowDialog });
    }
    componentWillMount(){
        this.props.createWork({
            name: "自定义作品",
            config: {
                videos: [],
                materials: [],
                properties: {
                    height: "720",
                    width: "1280",
                    scale: 1,
                    videoPlay: false,
                    duration: 0,
                    positionX: 0,
                    positionY: 0,
                    videoPX: "px1",
                    videoType: "type1",
                }
            }
        });
        // this.props.loadWork({
        //     id: "269"
        // });
    }

    render(){
        const { work } = this.props;
        const { videos, materials, properties } = work.config;
        const { isShowLoginDialog, isShowRegisterDialog } = this.state;
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
                        <MaterialArea materials={materials} changeaActiveContainer={this.changeaActiveContainer}></MaterialArea>
                        <StageArea>
                            {this.renderContainer()}
                        </StageArea>
                        <OperationArea changeaActiveContainer={this.changeaActiveContainer}></OperationArea>
                        <EditArea materials={materials}></EditArea>
                    </div>
                    <TimeArea changeaActiveContainer={this.changeaActiveContainer}></TimeArea>
                </Container>
                <div className='form-panel'>
                    {/* 登录框 */}
                    <LoginPage
                        isShow={isShowLoginDialog}
                        width={config.dialog.width}
                        onClose={() => this.configureDialogHandle('Login', false)} />

                    {/* 注册框 */}
                    <RegisterPage
                        isShow={isShowRegisterDialog}
                        width={config.dialog.width}
                        onClose={() => this.configureDialogHandle('Register', false)} />
                </div>
                
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
                    .form-panel {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        width: 360px;
                        transform: translate(-50%,-50%);
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

const mapStateToProps = ({ work }) => {
    return {
        work
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        // loadMaterials: bindActionCreators(loadMaterials, dispatch),
        createWork: bindActionCreators(createWork, dispatch),
        loadWork: bindActionCreators(loadWork, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialEffec);