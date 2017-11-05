import {connect} from 'react-redux'
import React from 'react'
import ClassNames from 'classnames'
import { bindActionCreators } from 'redux';

import Header from './header/Header';
import {getWorks} from '../reducers/userWorks'
import './UserWorks.css'

class UserWorks extends React.Component {
    componentWillMount() {
        this.props.getWorks({ curr: 1, pageSize: 10 });
    }
    render() {
        console.log(this.props.userWorks);
        return <div className='user-works'>
            <Header />
            <div className='user-works-body'>
               {/* <LeftNavigation/>
               <WorksContent /> */}
            </div>
        </div>
    }
}

const mapStateToProps = ({ userWorks }) => {
    return {
        userWorks
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getWorks : bindActionCreators(getWorks, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserWorks);