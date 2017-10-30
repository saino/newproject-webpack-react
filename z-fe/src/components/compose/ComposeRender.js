import React, {Component} from 'react'
import Draggable from '../../components/interaction/react-draggable/Draggable';

export default class ComposeRender extends Component {
    onDragEnd(item,index,x,y){
        //如何更新位置 todo
        this.props.changePosision({...item,top:y-item.top,left:x-item.left},index)
        console.log(arguments);
    }
    render() {
        const {compose} = this.props
        const layers = compose.materials.map((item, index) => {
            let style = {top: item.top, left: item.left, width: item.width, height: item.height}
            return (
                <div className='composed-material' style={style} key={item.id}>
                    <Draggable defaultPosition={{x:style.left,y:style.top}} onDragEnd={this.onDragEnd.bind(this,item,index)}>
                    <img className='thumb' src={this.props.frameDataUrl}/>
            </Draggable>
                </div>)
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