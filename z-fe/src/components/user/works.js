import React, {Component} from 'react'
import Pagination from 'rc-pagination'
import {getWorksIfNeeded,removeWork} from '../../actions'
import {PAGESIZE} from "../../actions/index";

require('rc-pagination/assets/index.css')
export default class Works extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
       if (this.props.worksInfo.currentPage ==0) {
            this.props.dispatch(getWorksIfNeeded(1, PAGESIZE))
        }
    }
    onChange(cur,size){
        this.props.dispatch(getWorksIfNeeded(cur,size))
    }
    removeWork(itemNo,index){
        const {worksInfo} = this.props;
        this.props.dispatch(removeWork(itemNo,worksInfo.currentPage,PAGESIZE,index))
    }
    render() {
        const {worksInfo} = this.props;
        if (worksInfo.currentPage !== 0) {
            if(!worksInfo.page[worksInfo.currentPage]){
                return <div>reload work</div>
            }
            var works = worksInfo.page[worksInfo.currentPage].map( (item,i)=> {
                return <div key={i}>第{item.itemNo}个作品 <button onClick={this.removeWork.bind(this,item.itemNo,i)}>删除</button></div>
            })
            return (
                <div>
                    <div className='works'>
                        {works}
                    </div>
                    <Pagination defaultCurrent={1} total={50} pageSize={PAGESIZE} onChange={this.onChange}/>
                </div>)
        } else {
            return <div>加载中</div>
        }

    }

}