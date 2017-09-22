import React, { Component } from 'react'
import Nav from '../nav'


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
    }
    register(){
        function cb() {
            // this.props.history.push('/')

        }
        this.props.register({name:this.name.value,pwd:this.pwd.value,verification:this.verification.value,cb:cb.bind(this)})
    }
    render(){
        return (<div className="register">
            <Nav></Nav>
            <div><label htmlFor="">用户名</label><input type="text" ref={(dom)=>{this.name=dom;}}/></div>
            <div><label htmlFor="">验证码</label><input type="text" ref={(dom)=>{this.verification=dom;}}/></div>
            <div><label htmlFor="">密码</label><input type="text" ref={(dom)=>{this.pwd=dom;}}/></div>
            <div><label htmlFor="">密码确认</label><input type="text" ref={(dom)=>{this.comfirmPwd=dom;}}/></div>
            <button onClick={this.register}>注册</button>
        </div>)
    }
}