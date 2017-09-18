import React, { Component } from 'react'
import Nav from '../nav'
import {Redirect} from 'react-router-dom'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.clickedLogin= false
    }
    
    login(e){
        e.preventDefault()
        this.props.login(this.name.value);
        this.clickedLogin= true
        console.log(this.name.value)
    }
    render(){
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const {login}=this.props;
       
        if (login&&this.clickedLogin) {
            this.clickedLogin= false
            return (
              <Redirect to={from}/>
            )
          }
        return (<div className="login">
            <Nav></Nav>
            <form >
                <div><label htmlFor="">user name</label><input type="text" ref={(dom)=>{this.name=dom;}}/></div>
                <button onClick={this.login}>login</button>
            </form>
        </div>)
    }
}
