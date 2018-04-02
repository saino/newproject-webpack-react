import React, { Component } from 'react';
import PropTypes from 'prop-types';
import materialListStyle from './material-list.css';
import MaterialItem from './MaterialItem/MaterialItem';

export default class MaterialList extends Component {
  componentWillMount() {
    // 请求素材action
  }

  render() {
    return (
      <div className={ materialListStyle[ 'wrapper' ] }>
        <div className={ materialListStyle[ 'list' ] }>
          <div className={ materialListStyle[ 'list-item' ] }>
            <MaterialItem visibleUploadOrDetail={ 0 } materialName="这里是作品名称" />
          </div>
          <div className={ materialListStyle[ 'list-item' ] }>
            <MaterialItem visibleUploadOrDetail={ 1 } />
          </div>
          <div className={ materialListStyle[ 'list-item' ] }>
            <MaterialItem visibleUploadOrDetail={ 2 } />
          </div>
        </div>
      </div>
    );
  }
}
