import React from 'react'
import  Pagination from 'rc-pagination'
require('rc-pagination/assets/index.css')

export default ()=>{
    return (<Pagination defaultCurrent={1} total={50} />)
}