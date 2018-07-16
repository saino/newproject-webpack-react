import React, { Component } from "react";
import MaterialContainer from "./material-container";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { loadRotokMaterial, loadMoreRotoMaterial, deleteRotoMaterial, loadFirstPageRotoMaterial } from "../../../stores/reducers/user-material";
import AddWork from "../../../views/statics/add-work.png";
import RotoMaterialItem from "./roto-material-item";
import config from "../../../config";

class RotoMaterialContainer extends MaterialContainer {
    constructor() {
        super();
    }
    componentWillMount() {
        const { pagination } = this.props;
        if (pagination === 1) {
            this.props.loadRotokMaterial({
                "page": pagination,
                "perpage": config.page.userCenterPageSize,
            });
        }
        this.loadFirstPageRoto();
    }
    renderAddNew() {

    }
    onDeleClick = (model) => {
        const { pagination } = this.props;
        this.props.deleteRotoMaterial(model, () => {
            let currentPagination = pagination;
            if ((this.props.materials.length + 1) % config.page.userCenterPageSize === 0) {
                currentPagination = currentPagination - 1;
            }
            this.props.loadMoreRotoMaterial({
                "page": currentPagination,
                "perpage": config.page.userCenterPageSize,
            })
        });
    }
    loadFirstPageRoto = () => {
        this.props.loadFirstPageRotoMaterial({
            "page": 1,
            "perpage": config.page.userCenterPageSize,
        });
    }
    renderMaterialItem() {
        const { materials } = this.props;
        return materials.map((materialItem, index) => {
            return <RotoMaterialItem key={materialItem.id} model={materialItem} onDeleClick={this.onDeleClick}/>
        });
    }
    loadMoreMaterial(loadEndFUN) {
        const { pagination } = this.props;
        this.props.loadMoreRotoMaterial({
            "page": pagination,
            "perpage": config.page.userCenterPageSize,
        }, loadEndFUN);
    }
}
const mapStateToProps = ({ userMaterial }) => {
    return { ...userMaterial.rotoMaterial };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadRotokMaterial: bindActionCreators(loadRotokMaterial, dispatch),
        loadMoreRotoMaterial: bindActionCreators(loadMoreRotoMaterial, dispatch),
        deleteRotoMaterial: bindActionCreators(deleteRotoMaterial, dispatch),
        loadFirstPageRotoMaterial: bindActionCreators(loadFirstPageRotoMaterial, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RotoMaterialContainer);