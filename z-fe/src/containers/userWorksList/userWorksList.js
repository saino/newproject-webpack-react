import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Pagination } from 'antd'

import { getWorks } from '../../reducers/userWorks'
import { WorkItem } from '../../components'

import './userWorksList.css'

const PAGE_SIZE = 12;

class UserWorksList extends React.Component {
    constructor(props, context){
        super(props.context);
        // console.log(this.props.userWorks.curr);
        this.state = {
            pageSize: PAGE_SIZE
        }
    }
    componentWillMount(){
        this.props.requestUserWorks({curr: 0, pageSize: PAGE_SIZE});

    }
    renderAddNewWorks() {
        const { curr, pageSize, total } = this.props.userWorks;
        const bankWorkNum = pageSize - 1 - total%pageSize;
        let bankWorkItem = [];
        for(let i=0; i<bankWorkNum; i++){
            bankWorkItem.push(<WorkItem key={i} bank={true}/>);
        }
        if(curr===Math.floor(total/pageSize)){
            bankWorkItem.unshift(<WorkItem key="addNew" addNew={true} />);
            return bankWorkItem;
        }
    }
    renderUserWorks(){
        const {curr, pageSize, total, works} = this.props.userWorks;
        return works.map((work, index)=>{
            return <WorkItem key={`work-${work.workId}`} model={work}/>
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
                    {this.renderAddNewWorks()}
                </div>
                <div className='user-works-list-content-pages'>
                    <Pagination onChange={this.onPageChanged}
                        total={this.props.userWorks.total%PAGE_SIZE ? this.props.userWorks.total: this.props.userWorks.total+1}
                        defaultCurrent={this.props.userWorks.curr+1}
                        defaultPageSize={PAGE_SIZE}/>
                </div>
            </div>
        </div>
    }
    onPageChanged = (current, pageSize) => {
        this.props.requestUserWorks({curr: current-1, pageSize: pageSize});
    }
}

const mapStateToProps = ({user, userWorks}) => {
    return {
        userInfo: user.user,
        userWorks: userWorks
    };
}
const  mapDispatchToProps = (dispatch) => {
    return {
        requestUserWorks : bindActionCreators(getWorks, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserWorksList);
