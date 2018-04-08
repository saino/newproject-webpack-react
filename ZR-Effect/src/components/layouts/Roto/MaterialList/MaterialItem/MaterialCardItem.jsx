import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import itemStyle from './item.css';

export default class MaterialCardItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    thumb: PropTypes.string,
    onCheck: PropTypes.func,
  };

  checkHandle = () => {
    const { id, onCheck } = this.props;
    onCheck(id)
  };

  render() {
    const { name, thumb } = this.props;

    return (
      <div className={ itemStyle[ 'wrapper' ] } onClick={ this.checkHandle }>
        <div className={ `${ itemStyle[ 'gc-show' ] } ${ itemStyle[ 'cd' ] }` }>
          <div>
            <img src={ thumb } />
          </div>
        </div>
        <div className={ itemStyle[ 'detail-show' ] }>{ name }</div>
      </div>
    );
  }
}
