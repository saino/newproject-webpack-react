import React, {Component} from "react";

import { Avatar } from "antd";

import LogImg from "../../../components/containers/Header/logo.png"
class HeaderNav extends Component {
    render() {
        return <div className="header-nav">
            <div className="nav-logo nav-btn"><img src={LogImg}/>LIANGZIVFX</div>
            <div className="nav-btn">智能抠像</div>
            <div className="nav-btn">特效制作</div>
            <div className="nav-btn">价格方案</div>
            <div className="nav-btn">帮助中心</div>
            <div className="nav-btn">联系我们</div>
            <Avatar className="user-img"></Avatar>
            <style>{`
                .header-nav{
                    display: flex;
                    width: 100%;
                    height: 50px;
                    background: rgba(13,29,33,1);
                    position: relative;
                    z-index: 1;
                }
                .nav-btn{
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #818B8A;
                    color: #ffffff;
                    margin-right: 24px;
                    line-height: 50px;
                    cursor: pointer;
                }
                .nav-logo{
                    position: relative;
                    color: #5A9B9F;
                    margin-left: 32px;
                    text-indent: 40px;
                    font-size: 20px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #ffffff;
                    margin-right: 24px;
                    line-height: 50px;
                    cursor: pointer;

                }
                .nav-logo img{
                    position: absolute;
                    margin-top: 12px;
                    left: 0;
                }
                .user-img{
                    position: absolute;
                    right: 32px;
                    top: 9px;
                }
            `}</style>
        </div>
    }
}

export default HeaderNav;
