import React, { Component } from 'react'
import { Link,Route ,Redirect} from 'react-router-dom'
import Works from './works'
import Profile from './profile'
import Nav from '../nav'

export default class User extends Component {
    
    static defaultProps = {
      isFetching: true,
      loadingLabel: 'Loading...'
    }
  
    render() {
        const {match,user}=this.props;
        const { login, avatarUrl, name } = user;
        if(login){
            return (
                <div>
                    <Nav/>
                    <ul>
                        <li>
                            <Link to={match.url}>我的作品</Link>
                        </li>
                        <li>
                            <Link to={`${match.url}/profile`}> 个人中心</Link>
                        </li>
                        <li>
                            <Link to={`${match.url}/profile`}> 退dd出</Link>
                        </li>
                    </ul>
                    <Route path={`${match.url}/profile`} component={Profile}></Route>
                    <Route exact path={match.url} component={Works}></Route>
                </div>
            )
        }else{
           return  <Redirect to={{
                pathname: '/login',
                state: { from: this.props.location }
            }}/>
        }

    }
  }
  