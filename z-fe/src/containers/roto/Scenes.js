import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deepCompare } from 'pure-render-immutable-decorator';
import { getWorks } from '../../reducers/userWorks';

class Scenes extends PureComponent {
  static propTypes = {
    scenes: PropTypes.array,
    onChangeScene: PropTypes.func
  };

  handleChangeScene = (sceneId) => () => {
    this.props.onChangeScene(sceneId);
  };

  render() {
    const { sceneId, scenes } = this.props;

    return (
      <div className="scenetype">
        <ul>{ this.props.scenes.map((item, index) => {
          const selected = sceneId === item.id;

          return (
            <li
              onClick={ this.handleChangeScene(item.id) }
              key={ item.id }
              className={ selected ? 'active' : void 0 }>
              {`镜头${ index + 1 } : 固定广告植入`}
            </li>
          );
        }) }</ul>

        <style>{`
          .scenetype {
            height: 100%;
            background: #f2f2f2;
          }
          .scenetype ul {
            font-size: 16px;
            color: #000;
            background: #f2f2f2;
          }
          .scenetype ul li {
            line-height: 60px;
            padding: 0 12px;
            cursor: pointer;
          }
          .scenetype ul li.active {
            background: #124967;
            color: #fff;
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ userWorks }) => ({ userWorks });

export default connect(mapStateToProps)(Scenes);
