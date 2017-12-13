import {connect} from 'react-redux';
import React from 'react';
import ClassNames from 'classnames';
import { bindActionCreators } from 'redux';

import Header from './header/Header';
import { LeftNavigation, LeftNavigationButton, RightArticle } from '../components';
//import UserWorksList from './userWorksList/userWorksList';
import Uwl from './userWorksList/Uwl';
import {getWorks} from '../reducers/userWorks';

class Work extends React.Component {
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
                return <Uwl />;
            case "个人中心":
                return <div>个人中心</div>;
            default:
                return <div>我的作品</div>;
        }
    }
    render() {
        return <div className='user-works'>
            <Header style={{ background: '#124968' }} />
            <div className='user-works-body'>
                <LeftNavigation buttons={this.getButtons()} activeName={this.state.activeName}/>
                <RightArticle>
                    {this.renderRightArticleContent()}
                </RightArticle>
            </div>
            <style>{`
              .user-works{
                  position: relative;
                  height: 100%;
                  width: 100%;
               }
               .user-works-body{
                  display: flex;
                  width: 1236px;
                  margin: 0 auto;
                  padding-top: 74px;
              }
            `}</style>
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
    };
}
export default connect(mapStateToProps)(Work);
