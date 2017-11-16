import React, {Component} from 'react';
import {Button} from 'antd'
import DragList from 'react-draggable-list'
import classNames from 'classnames'
import ToggleViewImg from '../../../statics/toggle_view.png'

export default class ComposeControl extends Component {
    constructor() {
        super()
        this.onMoveEnd = this.onMoveEnd.bind(this)
    }

    onMoveEnd(newArr, movedItem, oldIndex, newIndex) {
        const {compose} = this.props;

        var selectedIndex = compose.current
        if (compose.current === oldIndex) {
            selectedIndex = newIndex
        } else if (compose.current > oldIndex) {
            if (compose.current <= newIndex) {
                selectedIndex -= 1
            }
        } else {
            if (compose.current >= newIndex) {
                selectedIndex += 1
            }
        }
        this.props.changeLayer(newArr, selectedIndex)

    }

    render() {
        const {addMaterial, compose, select, removeMaterial, toggleMaterial} = this.props;
        var list = compose.materials.map((obj, index) => {
            return {...obj, index: index, selected: index == compose.current}
        })
        return (<div className="compose-control">
            <div className="header"> 第四步 ：素材植入</div>
            <div className="addMaterial"
                 onClick={addMaterial.bind(null, {name: "素材名称", top: 10, left: 0, width: 100, height: 60})}>
                <Button icon="plus" type="primary">添加素材</Button>
            </div>
            <ul className="material-list">
                <DragList list={list} itemKey="id" template={MList} padding={0} onMoveEnd={this.onMoveEnd}
                          commonProps={{select, removeMaterial, toggleMaterial}}></DragList>
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
              margin-top:16px;
              margin-bottom:16px;
          }
           .compose-control> .addMaterial button {
              width:100%;
          }

          .compose-control .material-item{
              background-color:#fff;
              border:2px solid transparent;
              height:32px;
              margin:0 16px;
              overflow:hidden;
          }
          .compose-control .toggle-view,.compose-control .layer-icon{
            float:left;
            width:33px;
            text-align:center;
            height:100%;

          }
          .compose-control .layer-icon{
          margin-right:16px;
          }

          .compose-control .toggle-view{
          margin-top:6px;
          }
           .compose-control .layer-icon img{
             max-height:100%;
             max-width:100%;

            }

           .compose-control .material-item.even{
             background-color:#ecf6fd
          }
          .compose-control .material-item .toggle-view{
             cursor:pointer;
          }
           .compose-control .material-item.selected{
             border-color:#2d8bbd
          }
        `}</style>
        </div>)
    }
}

function stop(e) {
    // e.stopPropagation();
}

class MList extends Component {
    toggle = this.toggle.bind(this)

    toggle(index, e) {
        const {commonProps} = this.props;
        commonProps.toggleMaterial(index);
        e.stopPropagation();
    }

    render() {
        const {item, dragHandle, commonProps} = this.props;
        let itemClass = classNames({
            'material-item': true,
            selected: item.selected,
            'even': (item.index + 1) % 2 == 0
        })

        return (<div className={itemClass} onClick={commonProps.select.bind(null, item.index)}>
            {dragHandle(<div onClick={stop}><span className="toggle-view"
                                                  onClick={this.toggle.bind(null, item.index)}> <img
                src={ToggleViewImg} style={{visibility: item.visible ? "visible" : "hidden"}} alt=""/></span><span
                className="layer-icon"><img
                src="http://localhost:3000/sample.jpg" alt=""/></span>{item.id}---{item.name}
            </div>)}
        </div>)

    }
}