import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import HeaderNav from "../components1/ui-layout/header-nav"
import Container from "../components1/ui-layout/container"
import MaterialArea from "../components1/ui-layout/material-area";
import StageArea from "../components1/ui-layout/stage-area";
import OperationArea from "../components1/ui-layout/operation-area";
import EditArea from "../components1/ui-layout/edit-area";
import TimeArea from "../components1/ui-layout/time-area";
import { Transform } from 'stream';

class SpecialEffec extends Component {
    render(){
        const { video, material, workName } = this.props.work1;
        return (
            <div className="warp">
                <HeaderNav/>
                <Container>
                    <div className="container-layout"> 
                        <MaterialArea material={material}></MaterialArea>
                        <StageArea></StageArea>
                        <OperationArea></OperationArea>
                        <EditArea material={material}></EditArea>
                    </div>
                    <TimeArea></TimeArea>
                </Container>
                <style>{`
                    .container-layout{
                        display: flex;
                        flex-wrap: wrap;
                    }
                `}</style>
            </div>
        );
    }
}

const mapStateToProps = ({ work1 }) => {
    return {
        work1
    };
}

export default connect(mapStateToProps)(SpecialEffec);