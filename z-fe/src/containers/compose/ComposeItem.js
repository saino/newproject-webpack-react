import React, { Component } from 'react';
import { Button } from 'antd'
import DragList from 'react-draggable-list'
import classNames from 'classnames'
import { addMaterial, changeLayer, select, removeMaterial, toggleMaterial } from '../../reducers/compose'
import ToggleViewImg from '../../statics/toggle_view.png'
import { connect } from 'react-redux';

class ComposeItem extends Component {
    render(){
        return (<div className="compose-item">
            <img className="compose-item-thumb" src={this.props.layer.properties.thumbnail} />
            <style>{`
                .compose-item{
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    // height: 70px;
                    // width: 100px;
                }
                .compose-item-thumb{
                    // height: 100%;
                    // width: 100%;
                }
            `}</style>
        </div>);
    }
}

export default ComposeItem;