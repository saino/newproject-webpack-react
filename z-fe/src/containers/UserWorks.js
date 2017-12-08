import {connect} from 'react-redux'
import React from 'react'
import ClassNames from 'classnames'
import { bindActionCreators } from 'redux';

import Header from './header/Header';
import { LeftNavigation, LeftNavigationButton, RightArticle } from '../components';
import UserWorksList from './userWorksList/userWorksList'
import {getWorks} from '../reducers/userWorks'
import './UserWorks.css'

class UserWorks extends React.Component {
    componentWillMount() {
        // this.props.requestWorks({ curr: 0, pageSize: 12 });
        this.state = {
            activeName: '我的作品'
        }
    }
    getButtons() {
        return [{
            buttonName: "我的作品",
            buttonAction: this.onButtonClicked,
            buttonIcon: "picture",
        },{
            buttonName: "个人中心",
            buttonAction: this.onButtonClicked,
            buttonIcon: "user",
        }]
    }
    renderRightArticleContent(){
        switch (this.state.activeName){
            case "我的作品":
                return <UserWorksList />;
            case "个人中心":
                return <div>个人中心</div>;
            default:
                return <div>我的作品</div>;
        }
    }
    render() {
        return <div className='user-works'>
            <Header />
            <div className='user-works-body'>
                <LeftNavigation buttons={this.getButtons()} activeName={this.state.activeName}/>
                <RightArticle>
                    {this.renderRightArticleContent()}
                </RightArticle>
            </div>
        </div>
    }
    onButtonClicked= (button) => {
        this.setState({
            activeName: button.buttonName
        });
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
export default connect(mapStateToProps)(UserWorks);
