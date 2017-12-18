// import React, { Component } from 'react';
// import ComposeRenderP from '../../components/compose/ComposeRender'
// import {connect} from 'react-redux'
// import {changePosision,changeContralPosision,select,removeSelected} from '../../reducers/compose'
//
// function mapStatToProps({compose}) {
//     return {compose}
// }
// export default connect(mapStatToProps,{changePosision,changeContralPosision,select,removeSelected})(ComposeRenderP)

import React, {Component} from 'react'
import DraggableCore from '../../components/interaction/react-draggable/DraggableCore';
import DragTransform from '../../components/interaction/transform';
import ComposeControl from './ComposeControl';

export default class ComposeRender extends Component {
    removeComposeLayer=this.removeComposeLayer.bind(this)
    constructor() {
        super()
        this.state = {
            cursor: 'default',
            x: 0, y: 0
        }
    }
    removeComposeLayer(e){
        if(e.keyCode==8||e.keyCode==46){
            const {removeSelected} = this.props;
            removeSelected();
        }
    }
    componentDidMount(){
        document.addEventListener('keyup',this.removeComposeLayer)
    }
    componentWillUnmount(){
        document.removeEventListener('keyup',this.removeComposeLayer)
    }
    onDragEnd(item, index, x, y) {
        //如何更新位置 todo
        this.props.changePosision({...item, top: y, left: x}, index)
        // console.log(arguments);
    }

    onControlledDrag(item, index, x, y) {
        this.props.changePosision({...item, top: (y + this.state.y), left: (x + this.state.x)}, index)
        // console.log(arguments);
    }

    onDragStart(x, y) {
        this.setState({x: x, y: y})

    }

    onHover(cursor) {
        this.setState({cursor});
    }

    onTransfromStart(item, index) {
        this.dragStart = item.controls[index]
    }

    onTransfrom(itemIndex, controlIndex, dx, dy,transformString) {
        this.props.changeContralPosision(itemIndex, controlIndex, {
            top: (dy + this.dragStart.top),
            left: (dx + this.dragStart.left)
        },transformString)
    }

    onTransfromEnd() {

    }

    render() {
        const {compose,select,addMaterial,changeLayer,removeMaterial,toggleMaterial} = this.props
        const layers = compose.materials.map((item, index) => {
            let style = {width: item.width, height: item.height}
            if(item.transformString){
                style.transform=item.transformString;
                style.transformOrigin='0 0'
            }
            if(!item.visible){
                return null
            }
            return (<DragTransform Dim={item} selected={compose.current===index} onDragStart={this.onTransfromStart.bind(this, item)}
                                   onDragEnd={this.onTransfromEnd.bind(this, item, index)}
                                   onDrag={this.onTransfrom.bind(this, index)} key={item.id}>
                <DraggableCore handle='.move-handler' position={{x: item.left, y: item.top}}
                               deltaPosition={{x: 0, y: 0}}
                               cursor={this.state.cursor}
                               onDrag={this.onControlledDrag.bind(this, item, index)}
                               onDragEnd={this.onDragEnd.bind(this, item, index)}
                               onHover={this.onHover.bind(this)}
                               onDragStart={this.onDragStart.bind(this)}
                >

                    <div style={style} className="compose-img" onClick={select.bind(null,index)}>
                        <img className='thumb move-handler' src={this.props.frameDataUrl}/>
                    </div>

                </DraggableCore></DragTransform> )
        })
        return (
          <div className="compose-wrap">
            <div className="compose-render" style={this.props.style}>
              <img className='scene' src={this.props.frameDataUrl}/>
              { layers }
            </div>
            <div className="compose-control">
              <ComposeControl
                addMaterial={ addMaterial }
                changeLayer={ changeLayer }
                select={ select }
                removeMaterial={ removeMaterial }
                toggleMaterial={ toggleMaterial }
                compose={ this.props.compose } />
            </div>


            <style>{`

          .compose-render {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(0,0,0,.25);
          }

          .compose-render .scene {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
         .compose-render .composed-material{
             position:absolute;
          }
          .compose-render .selected .compose-img{
          box-sizing:border-box;
          border:1px solid #1EBC9C;
          }
         .compose-render .thumb{
           width: 100%;
           height: 100%;
         }
        `}</style>
        </div>);
    }
}
