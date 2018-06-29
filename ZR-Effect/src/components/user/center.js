import React, { Component } from "react";
import Header from '../containers/Header/Header';
import Body from '../layouts/body-page/body-page';
import LeftSidebar from '../layouts/left-sidebar/left-sidebar';
import RightSection from "../layouts/right-section/right-section";

import LoginPage from '../layouts/LoginPage/LoginPage';
import RegisterPage from '../layouts/RegisterPage/RegisterPage';
import config from '../../config';

import fff from "../../views/statics/fff.png";

class UserCenter extends Component {

    constructor() {
        super();
        this.state = {
            isShowLoginDialog: false,
            isShowRegisterDialog: false,
            userNavData: [{
                title: "我的作品",
                active: true,
                handler: this.onClickNav,
            },{
                title: "我的抠像",
                active: false,
                handler: this.onClickNav,
            },{
                title: "我的视频",
                active: false,
                handler: this.onClickNav,
            },{
                title: "我的图片",
                active: false,
                handler: this.onClickNav,
            },{
                title: "我的音频",
                active: false,
                handler: this.onClickNav,
            }]
        };
        this.configureDialogHandle = (key, isShowDialog) =>
            this.setState({ [`isShow${key}Dialog`]: isShowDialog });
    }
    onClickNav = (e) => {
        console.log("dddddddddd");
    }
    renderUserNav = () => {
        return this.state.userNavData.map((navItem, index)=> {
            return <div className="user-nav-item" key={index} onClick={navItem.handler}> {navItem.title} </div>
        });
    }
    render(){
        const { isShowLoginDialog, isShowRegisterDialog } = this.state;
        return <div className="warp">
            <div className="header">
                <Header
                    onOpenLogin={() => this.configureDialogHandle('Login', true)}
                    onOpenRegister={() => this.configureDialogHandle('Register', true)} />
            </div>
            <Body>
                <LeftSidebar>
                    <div className="user-info">
                        <img src={fff}/>
                    </div>
                    <div className="login-out">退出登录</div>
                </LeftSidebar>
                <RightSection>
                    <div className="user-navigation">
                        {this.renderUserNav()}
                    </div>
                </RightSection>
            </Body>
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
            <style>{`
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
                .user-info{

                }
                .user-navigation{
                    height: 40px;
                    font-size: 12px;
                    color: #818B8A;
                    display: flex;
                    background: rgba(0,0,0,0.40);
                    padding-left: 18px;
                }
                .user-nav-item{
                    margin-right: 88px;
                    cursor: pointer;
                    line-height: 40px;
                }
                .login-out{
                    position: absolute;
                    bottom: 0;
                    background-image: linear-gradient(-150deg, #6CA1A5 0%, #3A686C 84%);
                    font-size: 14px;
                    color: #C4BF97;
                    height: 40px;
                    width: 160px;
                    text-align: center;
                    line-height: 40px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    }
}

export default UserCenter;