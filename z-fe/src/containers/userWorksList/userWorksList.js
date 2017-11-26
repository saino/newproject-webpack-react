import React from 'react'
import { connect } from 'react-redux'

import { WorkItem } from '../../components'

import './userWorksList.css'

class UserWorksList extends React.Component {
    renderUserWorks(){
        const {curr, pageSize, total, works} = this.props.userWorks;
        return works.map((work, index)=>{
            return <WorkItem key={`work-${work.workId}`} />
        });
    }
    render(){
        return <div className='user-works-list'>
            <div className="user-works-list-title">
                <div className='user-works-list-title-image'>
                    <img src={this.props.userInfo.avatar}/>
                </div>
                <div className='user-works-list-title-info'>
                    <div className='user-works-list-title-info-name'>{this.props.userInfo.usernick}</div>
                </div>
                <div className='user-works-list-title-line'/>
            </div>
            <div className='user-works-list-content'>
                <div className='user-works-list-content-wrap'>
                    {this.renderUserWorks()}
                </div>
                <div className='user-works-list-content-pages'>分页</div>
            </div>
        </div>
    }
}

const mapStateToProps = ({user, userWorks}) => {
    return {
        userInfo: user.user,
        userWorks: userWorks
    };
}

export default connect(mapStateToProps)(UserWorksList);