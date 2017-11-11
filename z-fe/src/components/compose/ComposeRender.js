import React, {Component} from 'react'
import DraggableCore from '../../components/interaction/react-draggable/DraggableCore';
import DragTransform from '../../components/interaction/transform';

export default class ComposeRender extends Component {
    constructor() {
        super()
        this.state = {
            cursor: 'default',
            x: 0, y: 0
        }
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
        const {compose} = this.props
        const layers = compose.materials.map((item, index) => {
            let style = {width: item.width, height: item.height}
            if(item.transformString){
                style.transform=item.transformString;
                style.transformOrigin='0 0'
            }

            return (<DragTransform Dim={item} onDragStart={this.onTransfromStart.bind(this, item)}
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

                    <div style={style} className="aaaa">
                        <img className='thumb move-handler' src={this.props.frameDataUrl}/>
                    </div>

                </DraggableCore></DragTransform> )
        })
        return (<div className="compose-render" style={this.props.style}>
            <img className='scene' src={this.props.frameDataUrl}/>
            {layers}

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
         .compose-render .thumb{
           width: 100%;
           height: 100%;
         }
        `}</style>
        </div>)
    }
}