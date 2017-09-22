import React, { Component } from 'react'
import Nav from '../nav'
import {Redirect} from 'react-router-dom'
import { postInfo,setUserInfo } from '../../utils'
import Modal from 'react-modal';

export default class Login extends Component {
    state={openDialog:false,msg:''}
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.closeModal=this.closeModal.bind(this)
    }
    login(e){
        e.preventDefault()
        var path=this.props.location.state?this.props.location.state.from.pathname:'/';
        var _this=this
        const {loginSuc}=this.props;
        postInfo({
            url:window.api+"login",
            data:{name:this.name.value,pwd:this.pwd.value},
            success:function (d) {
                if(d.status==0){
                    const {data}=d
                    setUserInfo({loginToken:data.loginToken,id:data.id});
                    loginSuc(data);
                    _this.props.history.push(path)
                }else{
                    _this.setState({openDialog:true,msg:d.msg})
                }

            },
            error:function (msg) {
                _this.setState({openDialog:true,msg:msg})
            }
        })
    }
    closeModal() {
        this.setState({openDialog: false});
    }
    render(){
        return (<div className="login">
            <Nav></Nav>
            <Modal isOpen={this.state.openDialog}  contentLabel="Modal">
               <div>{this.state.msg}</div>
                <button onClick={this.closeModal}>Close Modal...</button>
            </Modal>
            <form >
                <div><label htmlFor="">用户名</label><input type="text" ref={(dom)=>{this.name=dom;}}/></div>
                <div><label htmlFor="">密码</label><input type="text" ref={(dom)=>{this.pwd=dom;}}/></div>
                <button onClick={this.login}>login</button>
            </form>
        </div>)
    }
}
