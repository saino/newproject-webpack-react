import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSceneType } from '../../reducers/sceneType';

class SceneType extends PureComponent {
  render() {
    const { sceneType } = this.props;

    return (
      <div className="scenetype">

        <ul>{ sceneType.map((type, index) => {
          const { key, name, selected } = type;

          return (
            <li key={ key } className={ selected ? 'active' : void 0 }>镜头{ index + 1 } : { name }</li>
          );
        }) }</ul>

        <style>{`
          .scenetype {
            flex-basis: 218px;
            background: #f2f2f2;
          }
          .scenetype ul {
            font-size: 16px;
            color: #000;
          }
          .scenetype ul li {
            line-height: 60px;
            padding: 0 20px;
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

function mapStateToProps ({ sceneType }) {
  return { sceneType };
}

function mapDispatchToProps (dispatch) {
  return {
    getSceneType: bindActionCreators(getSceneType, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SceneType);
