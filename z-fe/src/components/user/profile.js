import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { postInfo} from '../../utils'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
    }

    updateUser(e){
        e.preventDefault()
        const {getUserSuc,getUserFailure}=this.props;
        var obj={name:this.name.value,qq:this.qq.value,nick:this.nick.value}
        postInfo({
            url: `${window.api}updateuser`,
            data:obj,
            success: function (d) {
                if(d.status==0){
                    getUserSuc(d.data)
                    alert("修改成功")
                }else{
                    getUserFailure(d.msg)
                }

            }, error: function (msg) {
                getUserFailure(msg)
            }
        })
        // this.props.updateUser(obj);

    }
    render(){
        const {userInfo}=this.props;
        return (<div className="login">
            <form >
                <div><label htmlFor="">用户名</label><input type="text" ref={(dom)=>{this.name=dom;}} defaultValue={userInfo.name}/></div>
                <div><label htmlFor="">qq</label><input type="text" ref={(dom)=>{this.qq=dom;}} defaultValue={userInfo.qq}/></div>
                <div><label htmlFor="">昵称</label><input type="text" ref={(dom)=>{this.nick=dom;}} defaultValue={userInfo.nick}/></div>
                <button onClick={this.updateUser}>更新</button>
            </form>
        </div>)
    }
}
