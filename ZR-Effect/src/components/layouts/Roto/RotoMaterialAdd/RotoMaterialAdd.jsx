import React, { Component } from 'react';
import { Button } from 'antd';
import style from './roto-material-add.css';
import addMaterialPNG from './add-material.png';

export default class RotoMaterialAdd extends Component {
  openMaterialListHandle = () => {
    const { openMaterialList } = this.props;

    openMaterialList();
  };
  render() {
    return (
      <div className={ style[ 'add-btn-box' ] } onClick={ this.openMaterialListHandle }>
        <Button className={ style[ 'add-btn' ] }>
          <img src={ addMaterialPNG } />
          <label>添加扣像素材</label>
        </Button>
      </div>
    )
  }
}
