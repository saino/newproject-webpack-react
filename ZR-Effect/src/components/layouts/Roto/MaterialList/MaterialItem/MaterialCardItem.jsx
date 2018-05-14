import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import itemStyle from './item.css';

export default class MaterialCardItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    thumb: PropTypes.string,
    onRemoveMaterial: PropTypes.func,
    onCheck: PropTypes.func
  };

  state = {
    visibleShallowAndAction: false
  };

  checkHandle = () => {
    const { id, onCheck } = this.props;

    onCheck(id);
  };

  showShallowAndActionHandle = () =>
    this.setState({ visibleShallowAndAction: true });

  hideShallowAndActionHandle = () =>
    this.setState({ visibleShallowAndAction: false });

  removeMaterialHandle = e => {
    const { id, onRemoveMaterial } = this.props;

    e.stopPropagation();
    e.preventDefault();
    onRemoveMaterial(id);
  }

  render() {
    const { name, thumb } = this.props;
    const { visibleShallowAndAction } = this.state;

    return (
      <div
        className={  visibleShallowAndAction ? `${ itemStyle[ 'wrapper' ] } ${ itemStyle[ 'shallow' ] }` : itemStyle[ 'wrapper' ] }
        onClick={ this.checkHandle }
        onMouseEnter={ this.showShallowAndActionHandle }
        onMouseLeave={ this.hideShallowAndActionHandle }>
        <div className={ `${ itemStyle[ 'gc-show' ] } ${ itemStyle[ 'cd' ] }` }>
          <div>
            <img src={ thumb } />
          </div>
        </div>
        <div className={ itemStyle[ 'detail-show' ] }>
          { name }
        </div>
        { visibleShallowAndAction && (
          <div className={ itemStyle[ 'bar-remove' ] }>
            <Icon
              type="delete"
              className={ itemStyle[ 'icon-remove' ] }
              onClick={ this.removeMaterialHandle } />
          </div>
        ) }
      </div>
    );
  }
}
