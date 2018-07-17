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
import { createWork, loadWork, removeWork, changeWorkProperties } from "../stores/reducers/work";
import AlertView from "./components1/ui-layout/alert-view";
import DeleImg from "./statics/dele.png";
import { Redirect } from 'react-router-dom';

class SpecialEffec extends Component {

    constructor(){
        super();
        this.state = {
            activeContainer: "stage",
            materialContainerType: ["video", "image"],
            isShowLoginDialog: false,
            isShowRegisterDialog: false,
            workName: "自定义作品",
            workPX: "px3",
            workHiehght: "720",
            workWidth: "1280",
        };

        this.configureDialogHandle = (key, isShowDialog) =>
            this.setState({ [`isShow${key}Dialog`]: isShowDialog });
    }
    componentWillMount(){
        if (this.props.location.state && this.props.location.state.workId){
            this.props.loadWork({
                id: this.props.location.state.workId
            });
        }else{
            let work = this.props.work;
            work.id = undefined;
            this.props.removeWork();
        }
    }
    componentWillUnmount(){
        AlertView.removeDom();
    }
    componentDidMount() {
        // console.log(this, "dkkkkkkkkkkkkkjf");
    }
    onWorkNameChange = (e) => {
        const value = e.target.value;
        this.setState({
            workName: value
        });
    }
    onWorkPXChange = (e) => {
        const value = e.target.value;
        switch (value) {
            case "px1":
                this.setState({
                    workPX: value,
                    height: "400",
                    width: "800",
                });
                break;
            case "px2":
                this.setState({
                    workPX: value,
                    height: "540",
                    width: "960",
                });
                break;
            case "px3":
                this.setState({
                    workPX: value,
                    height: "720",
                    width: "1280",
                });
                break;
            case "px4":
                this.setState({
                    workPX: value,
                    height: "1080",
                    width: "1920",
                });
                break;
            default:
                this.setState({
                    workPX: value,
                    height: "720",
                    width: "1280",
                });
                break;
        }
    }
    onCreateWorkClick = (e) => {
        this.props.createWork({
            name: this.state.workName,
            config: {
                videos: [],
                materials: [],
                properties: {
                    height: this.state.workHiehght,
                    width: this.state.workWidth,
                    scale: 1,
                    videoPlay: false,
                    duration: 0,
                    positionX: 0,
                    positionY: 0,
                    videoPX: this.state.workPX,
                    videoType: "type1",
                }
            }
        }, (resp)=>{
            AlertView.removeDom();
        });
    }
    renderCreateWork = () => {
        return <div className="alert-view-container">
            <div className="alert-view-title">创建作品</div>
            <div className="alert-view-content">
                <div className="work-info">
                    <div className="info-label">作品名称</div>
                    <input className="info-value" onChange={this.onWorkNameChange} value={this.state.workName}/>
                </div>
                <div className="work-info">
                    <div className="info-label">作品分辨率</div>
                    <select className="info-value" onChange={this.onWorkPXChange} value={this.state.workPX}>
                        <option value="px1">800*400</option>
                        <option value="px2">960*540</option>
                        <option value="px3">1280*720</option>
                        <option value="px4">1920*1080</option>
                        <option value="px5">2K</option>
                    </select>
                </div>
                <div className="video-pub" onClick={this.onCreateWorkClick}>确定，开始特效制作</div>
            </div>
            <style>{`
                .alert-view-container{
                    height: 216px;
                    width: 360px;
                    background: rgba(38,66,70,0.8);
                }
                .alert-view-title{
                    position: relative;
                    height: 40px;
                    text-align: center;
                    font-size: 14px;
                    color: #fff;
                    line-height: 40px;
                    background: rgba(58,104,108,0.4);
                }
                .close-alert{
                    height: 40px;
                    cursor: pointer;
                    width: 40px;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
                .alert-view-content{
                    display: flex;
                    flex-flow: row wrap;
                    padding: 10px 60px;
                    font-size: 14px;
                    align-items: center;
                    height: calc(100% - 40px);
                    justify-content: center;
                    color: #fff;
                }
                .work-info{
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    margin-top: 10px;
                    height: 30px;
                    line-height: 30px;
                }
                .info-label{
                    color: #C4BF97;
                }
                .info-value{
                    outline: none;
                    border: none;
                    color: #fff;
                    background: rgba(0,0,0,0.6);
                    text-indent: 6px;
                    width: 140px;
                }
                .video-pub{
                    background-image: linear-gradient(150deg, #6CA1A5 0%, #3A686C 84%);
                    width: 240px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    color: #C4BF97;
                    cursor: pointer;
                    margin-top: 20px;
                }
            `}</style>
        </div>
    }
    renderCreateContaienr() {
        const { work } = this.props;
        if (!work.id){
            return <Container>
                {AlertView.render(this.renderCreateWork(), true)}
                {/* <div className="create-work">
                    <div className="create-work-title">创建作品</div>
                    <div className="create-work-input">

                    </div>
                </div> */}
            </Container>
        }else{
            AlertView.removeDom();
            const { videos, materials, properties } = work.config;
            const { isShowLoginDialog, isShowRegisterDialog } = this.state;
            // AlertView.removeDom();
            return <Container>
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
        }
        return null;
    }

    render(){
        const { token } = this.props;
        if (token == null) {
            return (
                <Redirect to="/" />
            );
        }
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
                {this.renderCreateContaienr()}
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
                        height: 100%;
                    }
                    .header {
                        position: relative;
                        height: 50px;
                        z-index: 999;
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

const mapStateToProps = ({ work, app }) => {
    return {
        work,
        token: app.token
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        // loadMaterials: bindActionCreators(loadMaterials, dispatch),
        createWork: bindActionCreators(createWork, dispatch),
        loadWork: bindActionCreators(loadWork, dispatch),
        removeWork: bindActionCreators(removeWork, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialEffec);