import React, { Component } from 'react';
import { Button } from 'antd'
import DragList from 'react-draggable-list'
import classNames from 'classnames'
import { addMaterial, changeLayer, select, removeMaterial, toggleMaterial } from '../../reducers/compose'
import ToggleViewImg from '../../statics/toggle_view.png'
import { connect } from 'react-redux';

class ComposeItem extends Component {
    render(){
        return (<div>
            ComposeItem
        </div>);
    }
}

export default ComposeItem;