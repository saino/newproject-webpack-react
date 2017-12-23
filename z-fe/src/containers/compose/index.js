import React, { Component } from 'react';
import { Button, Popover, Modal } from 'antd'
import DragList from 'react-draggable-list'
import classNames from 'classnames'
import { addMaterial, changeLayer, select, removeMaterial, toggleMaterial } from '../../reducers/compose'
import { addLayers } from '../../reducers/material'
import ToggleViewImg from '../../statics/toggle_view.png'
import { connect } from 'react-redux';
import ComposeControl from './ComposeControl1'
import ComposeItem from './ComposeItem'
import ComposeSceneItem from "./ComposeSceneItem";
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
            {material.id}
            <style>{`
                .material-item{
                    height: 80px;
                    cursor: pointer;
                    margin-bottom: 10px;
                    background: rgba(0,0,0,0.2);
                }
                .selected{
                    background: grey;
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

class ComposeWrap extends Component {
    constructor(){
        super();
        this.state = {

            //当前编辑素材下的所有镜头
            materialScenes: [],

            //当前选择的镜头ID
            currentSceneId: '',

            //当前选择镜头下的所有图层
            // scenesLayers: [],


            materialListVisible: false,
        }
    }
    componentWillMount(){
        setTimeout(() => {
            const { scenes, layers } = this.props.material;//.scenes;
            const materialId = this.props.materialId;
            const materialScenes = scenes.filter(scene => scene.material_id === materialId);
            const currentSceneId = materialScenes[0].id;
            // const scenesLayers = layers.filter(layer => layer.scene_id === currentSceneId);
            this.setState({
                currentSceneId,
                materialScenes,
                // scenesLayers,
            });
        }, 10);
    }
    renderComposeSceneItem() {
        const materialScenes = this.state.materialScenes;
        return materialScenes.map((sceneItem, index) => {
            return (<ComposeSceneItem key={sceneItem.id}
                scene={sceneItem}
                sceneIndex={index}
                currentSceneId={this.state.currentSceneId}
                onChangeCurrentSceneId={this.onChangeCurrentSceneId}/>)
        });
    }
    renderLayersList() {
        const { layers } = this.props.material;
        const { currentSceneId } = this.state;
        const scenesLayers = layers.filter(layer => layer.scene_id === currentSceneId);
        console.log(layers);
        return scenesLayers.map((scenesLayer, index) =>{
            return <div className="scenes-layer-item" key={scenesLayer.id}>
                镜头图层{index+1+": "+scenesLayer.path}
            </div>
        })
    }
    renderMaterialList() {
        const materials = this.props.material.materials;
        return materials.map((materialItem, index) => {
            return <MaterialItem material={materialItem} 
                key={materialItem.id}
                ref={`material-item-${index}`}/>
        });
    }
    render() {
        return (<div className='compose-wrap'>
            <div className="compose-scenes">
                {this.renderComposeSceneItem()}
            </div>

            <div className='compose-render'>
                <ComposeItem />
            </div>
            <div className="compose-control">
                <div className="header">第四步： 素材植入</div>
                <div className="addMaterial" onClick={this.onAddMaterialClick}>
                    <Button icon="plus" type="primary">添加素材</Button>
                </div>
                
                <ul className="compose-layers-list">
                    {this.renderLayersList()}
                    {/* <DragList> */}
                </ul>
                <div className="compose-complete">完成植入</div>
            </div>
            <Modal title="请选择素材"
                visible={this.state.materialListVisible}
                onOk={this.onConfirmAddMaterial}
                onCancel={this.onCancelAddMaterial}
                okText="确认"
                cancelText="取消"
                closable={false}>
                <div className="material-list">
                {
                    this.renderMaterialList()
                }
                </div>
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
                    height: 700px;
                    width: 800px;
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
                    background: grey;
                    overflow-y: auto;
                }
                .compose-layers-list{
                    width: 90%;
                    margin: 0 auto;
                    height: 80%;
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
        console.log(sceneId);
        // const { layers } = this.props.material;
        // const scenesLayers = layers.filter(layer => layer.scene_id === sceneId);
        this.setState({
            currentSceneId: sceneId,
            // scenesLayers
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
        const { materials, layers } = this.props.material;//.materials;
        const materialsNum = materials.length;
        for(let i=0; i<materialsNum; i++){
            const materialItemComponent = this.refs[`material-item-${i}`];
            
            if (materialItemComponent.isSelected()){
                let layerId = new Date().getTime();
                selectedMaterials.push({ ...materials[i], scene_id: this.state.currentSceneId, id: materials[i].id+"-"+layerId });
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
        const materials = this.props.material.materials;
        const materialsNum = this.props.material.materials.length;

        for (let i = 0; i < materialsNum; i++) {
            const materialItemComponent = this.refs[`material-item-${i}`];
            materialItemComponent.cancelSelected();
        }

        this.setState({
            materialListVisible: false
        });
    }
}

const mapStatToProps = ({ material }) => ({
    material
});
const mapDispatchToProps = (dispatch) => ({
    addLayers: bindActionCreators(addLayers, dispatch)
});
export default connect(mapStatToProps, mapDispatchToProps)(ComposeWrap);