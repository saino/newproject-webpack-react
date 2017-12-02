import React from 'react'
import { Dropdown, Menu, Icon } from 'antd'
import addNewPNG from '../../image/addNew.png'
import './workItem.css'

class WorkItem extends React.Component{
    constructor(){
        super();
        this.state = {
            warning: false
        }
    }
    getModel() {
        return this.props.model;
    }
    renderWarning() {
        if(!this.state.warning){
            return null;
        }
        return <div className='work-item-content-warning'>
            <div className='work-item-content-warning-content'>
                <div className='work-item-content-warning-content-title'>确定要删除吗？</div>
                <div className='work-item-content-warning-content-button'>
                    <div className='work-item-content-warning-content-button-item' 
                        onClick={this.onDeleteConfrimClicked}>确定</div>
                    <div className='work-item-content-warning-content-button-item' 
                        onClick={this.onDeleteCancelClicked}>取消</div>
                </div>
            </div>
        </div>
    }
    onDeleteConfrimClicked = () => {
        console.log("确定删除");
    }
    onDeleteCancelClicked = () => {
        this.setState({
            warning: false
        });
    }
    getMenu(labelName) {
        return (
          <Menu>
            <Menu.Item>{labelName}</Menu.Item>
          </Menu>
        );
    }
    renderWorkItemContent() {
        return <div className='work-item-content'>
            <div className='work-item-content-image'><img src={this.getModel().thumb}/></div>
            <div className='work-item-content-title'>{this.getModel().title+this.getModel().workId}</div>
            <div className='work-item-content-control'>
                <Dropdown  overlay={this.getMenu("编辑")}>
                    <div className='work-item-content-control-icon' onClick={this.onEditClicked}>
                        <Icon type='edit'/>
                    </div>
                </Dropdown>
                <Dropdown overlay={this.getMenu("删除")}>
                    <div className='work-item-content-control-icon' onClick={this.onDeleteClicked}>
                        <Icon type='delete'/>
                    </div>
                </Dropdown>
            </div>
            {this.renderWarning()}
        </div>
    }
    render(){
        if(this.props.addNew){
            return <div className='work-item'>
                <div className='work-item-content' onClick={this.onAddNewClicked}>
                    <img className='work-item-content-add-new' src={addNewPNG}/>
                </div>
            </div>
        }
        if(this.props.bank){
            return <div className='work-item'></div>
        }
        return <div className='work-item'>
            {this.renderWorkItemContent()}
        </div>
    }
    onAddNewClicked = () => {
        console.log("添加新作品");
    }
    onEditClicked = () => {
        console.log("edit");
    }
    onDeleteClicked = () => {
        this.setState({
            warning: true
        })
    }
}

export default WorkItem;
