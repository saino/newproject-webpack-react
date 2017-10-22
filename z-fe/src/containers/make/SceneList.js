import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deepCompare } from 'pure-render-immutable-decorator';

class SceneList extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func.isRequired
  };

  state = {
    selectedIndex: 0
  };

  handleSelect = (selectedIndex, item) => () => {
    this.setState({ selectedIndex });
    this.props.onSelect(item);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return deepCompare(this, nextProps, nextState);
  }

  render() {
    const { scene } = this.props;

    return (
      <div className="scenetype">

        <ul>{ scene.map((item, index) => {
          const { sceneId, text } = item;
          const selected = this.state.selectedIndex === index;

          return (
            <li
              key={ sceneId }
              className={ selected ? 'active' : void 0 }
              onClick={ this.handleSelect(index, item) }>
              镜头{ index + 1 } : { text }
            </li>
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

function mapStateToProps ({ scene }) {
  return { scene };
}

export default connect(mapStateToProps)(SceneList);
