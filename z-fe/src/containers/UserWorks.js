import {connect} from 'react-redux'
import React from 'react'
import ClassNames from 'classnames'
import { bindActionCreators } from 'redux';

import Header from './header/Header';
import { LeftNavigation, LeftNavigationButton, RightArticle } from '../components';
import {getWorks} from '../reducers/userWorks'
import './UserWorks.css'

class UserWorks extends React.Component {
    componentWillMount() {
        this.props.requestWorks({ curr: 0, pageSize: 10 });
    }
    getButtons() {
        return [{
            buttonName: "我的作品",
            buttonAction: this.onMyWorksClicked,
            buttonIcon: "picture",
        },{
            buttonName: "个人中心",
            buttonAction: this.onUserCenterClicked,
            buttonIcon: "user",
        }, {
            buttonName: "退出",
            buttonAction: this.onExitClicked,
            buttonIcon: "logout",
        }]
    }
    render() {
        return <div className='user-works'>
            <Header />
            <div className='user-works-body'>
                <LeftNavigation buttons={this.getButtons()} defaultActiveName="我的作品"/>
                <RightArticle>
                   rightArticle
                </RightArticle>
            </div>
        </div>
    }
    onMyWorksClicked = () => {
        console.log("我的作品");
    }
    onUserCenterClicked = () => {
        console.log("个人中心");
    }
    onExitClicked = () => {
        console.log("退出");
    }
}

const mapStateToProps = ({ userWorks }) => {
    return {
        userWorks
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        // getWorks : bindActionCreators(getWorks, dispatch)
        requestWorks : function(body){
            dispatch(getWorks(body));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserWorks);