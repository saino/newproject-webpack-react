import React, { Component } from 'react';
import { Button, Modal, Tooltip, Icon} from 'antd'
import DragList from 'react-draggable-list'
import classNames from 'classnames'
import DraggableCore from '../../components/interaction/react-draggable/DraggableCore';
import DragTransform from '../../components/interaction/transform';
import { addMaterial, changeLayer, select, removeMaterial, toggleMaterial } from '../../reducers/compose'
import { addLayers, deleteLayer, updateLayers, updateScenes } from '../../reducers/material'
import ToggleViewImg from '../../statics/toggle_view.png'
import { connect } from 'react-redux';
import ComposeControl from './ComposeControl1'
import ComposeItem from './ComposeItem'
import ComposeSceneItem from "./ComposeSceneItem";
import TransControl from "./transControl";
import SceneDisplay from '../roto/SceneDisplay';
import index from 'pure-render-immutable-decorator';
import { bindActionCreators } from 'redux';

class MaterialItem extends Component {
    constructor() {
        super();
        this.state = {
            selected: false,
        }
    }
    isSelected() {
        return this.state.selected;
    }
    cancelSelected() {
        this.setState({
            selected: false
        });
    }
    render(){
        const { material } = this.props;
        const materialClass = classNames({
            "material-item": true,
            "selected": this.state.selected
        });
        return (<div className={materialClass} onClick={this.onSelectClick}>
            <img className="material-thumb" src={material.properties.thumbnail} />
            <div className="material-title">{/[^/]+(?=\.)/.exec(material.path)[0]}</div>
            <style>{`
                .material-item{
                    height: 100px;
                    cursor: pointer;
                    // background: rgba(0,0,0,0.2);
                    width: 23%;
                    margin-right: 2%;
                }
                .material-thumb{
                    height: calc( 100% - 20px);
                    width: 100%;
                    object-fit: cover;
                }
                .material-title{
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    margin-top: -4px;
                }
                .selected{
                    border: solid 2px blue;
                }

            `}</style>
        </div>);
    }
    onSelectClick = () => {
        this.setState({
            selected: !this.state.selected
        });
    }
}

class LayterItem extends Component {
    render() {
        const { item, dragHandle, commonProps } = this.props;
        const layerClass = classNames({
            "scenes-layer-item": true,
            "select": commonProps.currentLayer.id === item.id
        });
        return dragHandle(<div className={layerClass} key={item.id} onClick={this.onLayerClick.bind(this, item)}>
            <div className="scenes-layer-item-title">镜头素材{": " + (/[^/]+(?=\.)/.exec(item.path)[0])}</div>
            <div className="scenes-layer-item-delete" onClick={this.onDeleteScenesLayer.bind(this, item)}>
                <Tooltip title="删除" placement="right">
                    <a className="delete-btn" href="javascript:;">
                        <Icon type="delete" />
                    </a>
                </Tooltip>
            </div>
        </div>);
    }

    /**
     * 点击选择镜头
     */
    onLayerClick = ( layer, event) => {
        const { onLayerClick } = this.props.commonProps;
        onLayerClick(layer);
    }

    /**
    * 删除图层镜头
    */
    onDeleteScenesLayer = (layer, event) => {
        event.stopPropagation();
        event.preventDefault();
        const { getCurrentLayers, deleteLayer, updateLayers } = this.props.commonProps;
        deleteLayer(layer);
        updateLayers(getCurrentLayers());
    }
}

class ComposeWrap extends Component {
    constructor(){
        super();
        this.state = {

            //当前编辑素材下的所有镜头
            materialScenes: [],

            //当前选择的镜头ID
            currentSceneId: '',

            //选择素材列表是否可见
            materialListVisible: false,

            currentLayer: {
                id: '',
                cursor: "default",
                x: 0,
                y: 0
            }
        }
    }
    componentWillMount(){
        setTimeout(() => {
            const materialScenes = this.getMaterialScenes();
            const currentSceneId = this.props.currentSceneId || materialScenes[0].id;
            this.setState({
                currentSceneId,
                materialScenes,
            });
        }, 10);
    }

    /**
     * 获取当前素材下的所有镜头
     */
    getMaterialScenes(){
        const { scenes } = this.props.material;
        const materialId = this.props.materialId;
        const materialScenes = scenes.filter(scene => scene.material_id === materialId);
        return materialScenes.sort((scene1, scene2) => {
            return scene1.order > scene2.order;
        });
    }

    /**
     * 左侧镜头列表
     */
    renderComposeSceneItem() {
        const materialScenes = this.getMaterialScenes();
        return <DragList list={materialScenes}
            itemKey="id"
            template={ComposeSceneItem}
            onMoveEnd={this.onScenesMoveEnd}
            commonProps={{
                currentSceneId: this.state.currentSceneId,
                onChangeCurrentSceneId: this.onChangeCurrentSceneId
            }} />
    }
    onScenesMoveEnd = (newList) =>{
        const scenes = newList.map((scene, index) => {
            return { ...scene, order: index + 1 }
        });
        this.props.updateScenes(scenes);
    }
    /**
     * 中间镜头图层编辑
     */
    renderComposeLayers() {
        const scenesLayers = this.getCurrentLayers();
        return scenesLayers.map((scenesLayer, index) => {
            let style = {width: scenesLayer.config.width, height: scenesLayer.config.height};
            let imgStyle = {};
            if (scenesLayer.config.transformString) {
                imgStyle.transform = scenesLayer.config.transformString;
                imgStyle.transformOrigin = '0 0';
            }
            const imgClass = classNames({
                "compose-item-thumb": true,
                "select": scenesLayer.id === this.state.currentLayer.id
            });
            return (<DraggableCore key={scenesLayer.id}
                        position={{x: scenesLayer.config.left, y: scenesLayer.config.top}}
                        deltaPosition={{x: 0, y: 0}}
                        cursor={ this.state.currentLayer.cursor}
                        onHover={(cursor)=>{this.setState({currentLayer: {...this.state.currentLayer, cursor}});}}
                        onDragStart={this.onDragStart}
                        onDrag={this.onControledDrag.bind(this, scenesLayer)}
                        onDragEnd={this.onDragEnd}>
                        <div style={style} className="compose-item" onClick={this.onLayerClick.bind(this, scenesLayer)}>
                            <img style={imgStyle} className={imgClass} src={scenesLayer.properties.thumbnail} />
                            {/* 左上角控制点 */}
                            <TransControl controlPoint={0} control={scenesLayer.config.controls[0]} currentLayer={this.state.currentLayer}
                                layer={scenesLayer} onDragStart={this.onTransfromStart} onDrag={this.onTransfrom}/>
                            {/* 右上角控制点 */}
                            <TransControl controlPoint={1} control={scenesLayer.config.controls[1]} currentLayer={this.state.currentLayer}
                                layer={scenesLayer} onDragStart={this.onTransfromStart} onDrag={this.onTransfrom}/>
                            {/* 右下角控制点 */}
                            <TransControl controlPoint={2} control={scenesLayer.config.controls[2]} currentLayer={this.state.currentLayer}
                                layer={scenesLayer} onDragStart={this.onTransfromStart} onDrag={this.onTransfrom}/>
                            {/* 左下角控制点 */}
                            <TransControl controlPoint={3} control={scenesLayer.config.controls[3]} currentLayer={this.state.currentLayer}
                                layer={scenesLayer} onDragStart={this.onTransfromStart} onDrag={this.onTransfrom}/>
                        </div>
                    </DraggableCore>);
        });
    }
    onTransfromStart = (layer, controlPoint) => {
        this.transControlDragStart = {
            left: layer.config.controls[controlPoint].left,
            top: layer.config.controls[controlPoint].top
        }
    }
    onTransfrom = (layer, controlPoint, disx, disy, transformString) => {
        const newLayer = { ...layer };
        newLayer.config.controls[controlPoint].left = disx + this.transControlDragStart.left;
        newLayer.config.controls[controlPoint].top = disy + this.transControlDragStart.top;
        newLayer.config.transformString = transformString;
        this.props.updateLayers(newLayer);
    }

    onDragStart = (x, y) =>{
        this.setState({
            currentLayer: {...this.state.currentLayer, x, y}
        });
        // console.log("ondragStart", arguments);
    }
    onControledDrag = (layer, disx, disy) => {
        // console.log(disx, disy);
        this.props.updateLayers({ ...layer, config: { ...layer.config, left: (disx + this.state.currentLayer.x), top: (disy + this.state.currentLayer.y)}});
        // console.log("onDrag", arguments);
    }
    onDragEnd = (item, index, x, y) => {
        // console.log("onDragEdn", arguments);
    }

    /**
     * 右侧镜头图层列表
     */
    renderLayersList() {
        const { deleteLayer, updateLayers } = this.props;
        const scenesLayers = this.getCurrentLayers();
        return <DragList list={scenesLayers}
            itemKey="id"
            template={LayterItem}
            onMoveEnd={this.onMoveEnd}
            commonProps={{
                            deleteLayer,
                            getCurrentLayers: this.getCurrentLayers,
                            updateLayers: this.onMoveEnd,
                            onLayerClick: this.onLayerClick,
                            currentLayer: this.state.currentLayer
                        }}/>;
    }

    /**
     * 调整图层层级顺序结束
     */
    onMoveEnd = (newList, movedItem, oldIndex, newIndex) => {

        const layers = newList.map((layer, index) => {
            return {...layer, order: index+1}
        });
        this.props.updateLayers(layers);
    }

    /**
     * 添加素材列表
     */
    renderMaterialList() {
        const materials = this.props.material.materials;
        return materials.map((materialItem, index) => {
            return <MaterialItem material={materialItem}
                key={materialItem.id}
                ref={`material-item-${index}`}/>
        });
    }

    /**
     * 获取当前镜头下的基础图层
     */
    getCurrentBaseLayer = () => {
        const { layers } = this.props.material;
        return layers.find(layer => {
            return (layer.scene_id === this.state.currentSceneId) && layer.baseLayer;
        });
    }

    /**
     * 获取当前镜头下的所有非基础图层
     * （按照图层层级排序）
     */
    getCurrentLayers = () => {
        const { layers } = this.props.material;
        return layers.filter(layer => {
            return (layer.scene_id === this.state.currentSceneId) && (!layer.baseLayer);
        }).sort((layer1, layer2) => {
            return layer1.order > layer2.order;
        });
    }
    render() {
        const baseLayer = this.getCurrentBaseLayer();
        return (<div className='compose-wrap'>

            {/* 左侧镜头 */}
            <div className="compose-scenes">
                {this.renderComposeSceneItem()}
            </div>

            {/* 中间图层编辑 */}
            <div className='compose-render'>
                <div className='compose-render-wrap'>
                    {baseLayer ? <div className="base-compose-item" key={baseLayer.id}>
                        <img className="base-compose-item-thumb" src={baseLayer.properties.thumbnail} />
                    </div> : null}
                    {this.renderComposeLayers()}
                </div>
            </div>

            {/* 右侧图层列表 */}
            <div className="compose-control">
                <div className="header">第三步： 素材植入</div>
                <div className="addMaterial" onClick={this.onAddMaterialClick}>
                    <Button icon="plus" type="primary">添加素材</Button>
                </div>
                <ul className="compose-layers-list">
                    {baseLayer ? <div className="scenes-layer-item" key={baseLayer.id}>
                        <div className="scenes-layer-item-title">基础镜头{": " + (/[^/]+(?=\.)/.exec(baseLayer.path)[0])}</div>
                    </div> : null}
                    {this.renderLayersList()}
                </ul>
                <div className="compose-complete" onClick={this.onCompleteWorkClick}>完成植入</div>
            </div>

            {/* 素材选择列表弹出框 */}
            <Modal title="请选择素材"
                visible={this.state.materialListVisible}
                onOk={this.onConfirmAddMaterial}
                onCancel={this.onCancelAddMaterial}
                okText="确认"
                cancelText="取消"
                closable={false}>
                <div className="material-list">{
                    this.renderMaterialList()
                }</div>
            </Modal>

            <style>{`
                .compose-wrap{
                    display: flex;
                    position: relative;
                    justify-content: space-between;
                    width: 100%;
                }
                .compose-scenes{
                    background: rgba(200,200,200,0.5);
                    width: 200px;
                }
                .compose-render{
                    flex: 1;
                    position: relative;
                }
                .compose-render-wrap{
                    font-size: 0;
                    position: relative;
                    width: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .base-compose-item{
                    position: relative;
                }
                .base-compose-item-thumb{
                    width: 100%;
                }
                .compose-item{
                    // border: 1px solid #1EBC9C;
                }
                .compose-item-thumb{
                    width: 100%;
                    height: 100%;
                }
                .compose-item-thumb.select{
                    border: 1px solid #1EBC9C;
                }
                .compose-control{
                    position: relative;
                    width: 200px;
                    background: rgba(200,200,200,0.5);
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
                .material-list{
                    height: 500px;
                    width: 500px;
                    overflow-y: auto;
                    display: flex;
                    flex-flow: wrap row;
                    justify-content: flex-start;
                }
                .compose-layers-list{
                    width: 90%;
                    margin: 0 auto;
                    height: 80%;
                }
                .scenes-layer-item{
                    display: flex;
                    justify-content: space-between;
                    height: 30px;
                    width: 100%;
                    margin-bottom: 10px;
                    line-height: 30px;
                    border: solid 1px grey;
                    cursor: pointer;
                }
                .scenes-layer-item.select{
                    border: solid 1px #1EBC9C;
                }
                .scenes-layer-item-title{
                    flex: 1;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .scenes-layer-item-delete{
                    height: 30px;
                    width: 30px;
                    font-size: 20px;
                }
                .compose-complete{
                    position: absolute;
                    width: 90%;
                    left: 5%;
                    bottom: 30px;
                    background: rgba(100,100,100,0.5);
                    height: 28px;
                    text-align: center;
                    line-height: 28px;
                    color: #fff;
                    cursor: pointer;
                }
                // .compose-material{
                //     position: absolute;
                //     height: 100%;
                //     width: 100%;
                //     background:
                // }
            `}</style>
        </div>);
    }

    /**
     * 改变选择的镜头
     */
    onChangeCurrentSceneId = (sceneId) => {
        this.setState({
            currentSceneId: sceneId,
        });
    }

    /**
     * 点击添加素材按钮
     */
    onAddMaterialClick = () => {
        this.setState({
            materialListVisible: true,
        })
    }

    /**
     * 点击确定添加素材按钮
     */
    onConfirmAddMaterial = () => {
        const selectedMaterials = [];
        const { materials, layers } = this.props.material;
        const { currentSceneId }  = this.state;
        const materialsNum = materials.length;
        let layerOrder = this.getCurrentLayers().length + 1;
        for(let i=0; i<materialsNum; i++){
            const materialItemComponent = this.refs[`material-item-${i}`];
            if (materialItemComponent.isSelected()){
                let layerId = new Date().getTime();
                const layer = {
                    ...materials[i],
                    id: materials[i].id + "-" + layerId,
                    scene_id: currentSceneId,
                    order: layerOrder++,
                    config: {
                        height: 70,
                        width: 100,
                        top: 0,
                        left: 0,
                        controls: [
                            {top: -5, left: -5},
                            {top: -5, left: 95},
                            {top: 65, left: 95},
                            {top: 65, left: -5}
                        ]
                    }
                }
                selectedMaterials.push(layer);
            }
            materialItemComponent.cancelSelected();
        }
        this.props.addLayers(selectedMaterials);
        this.setState({
            materialListVisible: false,
        });
    }

    /**
     * 点击取消添加素材按钮
     */
    onCancelAddMaterial = () => {
        const materialsNum = this.props.material.materials.length;
        for (let i = 0; i < materialsNum; i++) {
            const materialItemComponent = this.refs[`material-item-${i}`];
            materialItemComponent.cancelSelected();
        }

        this.setState({
            materialListVisible: false
        });
    }

    /**
     * 点击选择当前镜头图层
     */
    onLayerClick = (layer) => {
        this.setState({
            currentLayer: {...this.state.currentLayer, id: layer.id}
        });
    }

    /**
     * 点击完成植入
     */
    onCompleteWorkClick = () => {
        console.log("dddddd");
    }
}

const mapStatToProps = ({ material }) => ({
    material
});
const mapDispatchToProps = (dispatch) => ({
    addLayers: bindActionCreators(addLayers, dispatch),
    deleteLayer: bindActionCreators(deleteLayer, dispatch),
    updateLayers: bindActionCreators(updateLayers, dispatch),
    updateScenes: bindActionCreators(updateScenes, dispatch),
});
export default connect(mapStatToProps, mapDispatchToProps)(ComposeWrap);
