import React, { Component } from 'react';
import classNames from 'classnames'

class ComposeSceneItem extends Component {

    render() {
        const { scene, currentSceneId, sceneIndex } = this.props;
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
        return (<div className={sceneClass} 
            key={scene.id}
            onClick={this.onSceneClick}>
        
            镜头{sceneIndex + 1}:{sceneType}

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
        </div>);
    }
    onSceneClick = () => {
        this.props.onChangeCurrentSceneId(this.props.scene.id);
    }
}

export default ComposeSceneItem;