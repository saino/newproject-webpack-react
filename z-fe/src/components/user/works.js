import React, {Component} from 'react'
import Pagination from 'rc-pagination'
import {getWorksIfNeeded} from '../../actions'
require('rc-pagination/assets/index.css')


export default class Works extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
       if (this.props.worksInfo.currentPage ==0) {
            this.props.dispatch(getWorksIfNeeded(1, 10))
        }
    }
    onChange(cur,size){
        this.props.dispatch(getWorksIfNeeded(cur,size))
    }
    render() {
        const {worksInfo} = this.props;
        if (worksInfo.currentPage !== 0) {
            var works = worksInfo.page[worksInfo.currentPage].map(function (item,i) {
                return <div key={i}>第{item.itemNo}个作品</div>
            })
            return (
                <div>
                    <div className='works'>
                        {works}
                    </div>
                    <Pagination defaultCurrent={1} total={50} onChange={this.onChange}/>
                </div>)
        } else {
            return <div>加载中</div>
        }

    }

}