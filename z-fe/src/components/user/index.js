import React, { Component } from 'react'
import { Link,Route ,Redirect,NavLink} from 'react-router-dom'
import Works from '../../containers/UserWork'
import UserInfo from '../../containers/UserInfo'
import Nav from '../nav'


export default class User extends Component {
    
    static defaultProps = {
      isFetching: true,
      loadingLabel: 'Loading...'
    }
    constructor(props){
        super(props)
        this.logOut=this.logOut.bind(this);
        if(!props.userInfo.name){
            props.getUser(function () {
                props.history.push('/login',{from: props.location})
            })
        }
    }
    logOut(){
        this.props.logout();
        this.props.history.push('/')
    }
    render() {

        const {match,userInfo}=this.props;

        if(!userInfo.name){
            return(<div>
                <Nav/>
                loading
            </div>)
        }
        const active={color: 'red'}
            return (
                <div>
                    <Nav/>
                    <ul>
                        <li>
                            <NavLink exact activeStyle={active} to={match.url}>我的作品</NavLink>
                        </li>
                        <li>
                            <NavLink  activeStyle={active} to={`${match.url}/profile`}> 个人中心</NavLink>
                        </li>
                        <li>
                            <button  onClick={this.logOut}>退出</button>
                        </li>
                    </ul>
                    <div>

                    </div>
                    <Route path={`${match.url}/profile`} component={UserInfo}></Route>
                    <Route exact path={match.url} component={Works}></Route>
                </div>
            )

    }
  }
  