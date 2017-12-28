import React, { Component } from 'react';
import classNames from 'classnames'

class ComposeSceneItem extends Component {

    render() {
        const { currentSceneId } = this.props.commonProps;
        const { dragHandle } = this.props;
        const scene = this.props.item;
        let sceneType = "";
        switch (scene.type) {
            case "roto":
                sceneType = "固定广告植入";
                break;

            default:
                sceneType = "镜头类型名称未定义";
                break;
        }
        const sceneClass = classNames({
            "scene-item": true,
            "active": scene.id===currentSceneId
        });
        return (dragHandle(<div className={sceneClass} 
            key={scene.id}
            onClick={this.onSceneClick}>
        
            镜头:{sceneType}

            <style>{`
                .scene-item{
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    color: #000;
                    font-size: 16px;
                    cursor: pointer;
                }
                .scene-item.active{
                    color: #fff;
                    background: #114967;
                }
            `}</style>
        </div>));
    }
    onSceneClick = () => {
        this.props.commonProps.onChangeCurrentSceneId(this.props.item.id);
    }
}

export default ComposeSceneItem;