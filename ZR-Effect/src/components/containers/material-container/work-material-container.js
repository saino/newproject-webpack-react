import React, { Component } from "react";
import MaterialContainer from "./material-container";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { loadWorkMaterial, loadMoreWorkMaterial, deleteWorkMaterial, loadFirstPageWorkMaterial } from "../../../stores/reducers/user-material";
import AddWork from "../../../views/statics/add-work.png";
import WorkMaterialItem from "./work-material-item";
import config from "../../../config";

class WorkMaterialContainer extends MaterialContainer {
    constructor(){
        super();
    }
    componentWillMount() {
        const { pagination } = this.props;
        if(pagination === 1) {
            this.props.loadWorkMaterial({
                "page": pagination,
                "perpage": config.page.userCenterPageSize,
                "template": false
            });
        }
        this.loadFirstPageWork();
    }
    componentDidMount(){
    }
    renderAddNew(){
        return <div className="material-item add" onClick={this.onCreateWorkClick}><img src={AddWork} /></div>;
    }
    onCreateWorkClick = () => {
        console.log(this);
        this.props.history.push("/special-effec", {workId: false});
    }
    onDeleClick = (model) => {
        const { pagination } = this.props;
        this.props.deleteWorkMaterial(model, () => {
            let currentPagination = pagination;
            if((this.props.materials.length+1)%config.page.userCenterPageSize === 0 ){
                currentPagination = currentPagination - 1;
            }
            this.props.loadMoreWorkMaterial({
                "page": currentPagination,
                "perpage": config.page.userCenterPageSize,
                "template": false
            })
        });
    }
    loadFirstPageWork = () => {
        this.props.loadFirstPageWorkMaterial({
            "page": 1,
            "perpage": config.page.userCenterPageSize,
            "template": false
        });
    }
    renderMaterialItem() {
        const { materials } = this.props;
        return materials.map((materialItem, index) => {
            return <WorkMaterialItem key={materialItem.id} history={this.props.history} model={materialItem} onDeleClick={this.onDeleClick}/>
        });
    }
    loadMoreMaterial(loadEndFUN) {
        const { pagination } = this.props;
        this.props.loadMoreWorkMaterial({
            "page": pagination,
            "perpage": config.page.userCenterPageSize,
            "template": false 
        }, loadEndFUN);
    }
}
const mapStateToProps = ({ userMaterial }) => {
    return { ...userMaterial.workMaterial};
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadWorkMaterial: bindActionCreators(loadWorkMaterial, dispatch),
        loadMoreWorkMaterial: bindActionCreators(loadMoreWorkMaterial, dispatch),
        loadFirstPageWorkMaterial: bindActionCreators(loadFirstPageWorkMaterial, dispatch),
        deleteWorkMaterial: bindActionCreators(deleteWorkMaterial, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkMaterialContainer);