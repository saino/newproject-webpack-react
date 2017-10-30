import React, { Component } from 'react';
import {Button} from 'antd'
import DragList from 'react-draggable-list'
import classNames from 'classnames'
export default class ComposeControl extends Component{
    constructor(){
        super()
        this.onMoveEnd=this.onMoveEnd.bind(this)
    }
    onMoveEnd(newArr,movedItem, oldIndex, newIndex){
        this.props.changeLayer(newArr,newIndex)

    }
    select(index){

    }
    render(){
        const {addMaterial,compose,select}=this.props;
        var list=compose.materials.map((obj,index)=>{
            return {...obj,index:index,selected:index==compose.current}
        })
        return (<div className="compose-control">
            <div className="header"> 第四步 ：素材植入</div>
            <div className="addMaterial" onClick={addMaterial.bind(null,{name:"素材名称",top:10,left:10,width:100,height:60})}>
                <Button icon="plus"  type="primary">添加素材</Button>
            </div>
            <ul className="material-list">
                <DragList list={list} itemKey="id" template={MList} padding={0} onMoveEnd={this.onMoveEnd} commonProps ={{select:select}}></DragList>
            </ul>
            <style>{`
          .pick {
            font-size: 14px;
            font-family: 'microsoft yahei';
            display: flex;
            flex-flow: column nowrap;
            align-items: stretch;
          }

          .compose-control> .header {
            text-align: center;
            line-height: 40px;
            color: #fff;
            background: #2d8bbd;
          }
          .compose-control> .addMaterial {
              width:90%;
              margin:0 auto;
          }
           .compose-control> .addMaterial button {
              width:100%;
          }

          .compose-control .material-item{
              background-color:#fff;
              border:2px solid transparent;
          }
           .compose-control .material-item.even{
             background-color:#ecf6fd
          }
           .compose-control .material-item.selected{
             border-color:#2d8bbd
          }
        `}</style>
        </div>)
    }
}

class MList extends Component{
    render(){
        const {item,dragHandle,commonProps}=this.props;
        let itemClass=classNames({
            'material-item':true,
            selected:item.selected,
            'even':(item.index+1)%2==0
        })

        return (<div className={itemClass}>
            {dragHandle(<div onClick={commonProps.select.bind(null,item.index)}>{item.id}---{item.name}</div>)}
        </div>)

    }
}