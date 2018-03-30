import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress, Button } from 'antd';
import rotoAiStyle from './roto-ai.css';
import startRotoPNG from './start-roto.png';

export default class RotoAi extends Component {
  static propTypes = {
    isAiRoto: PropTypes.bool,
    aiRotoPercent: PropTypes.number,
    filename: PropTypes.string
  };

  render() {
    const { isAiRoto, aiRotoPercent, filename } = this.props;

    return (
      <div className={ rotoAiStyle[ 'wrapper' ] }>
        <Button className={ rotoAiStyle[ 'ai-roto' ] }>
          <img src={ startRotoPNG } />
          <label>开始云端智能扣像</label>
        </Button>
        <div className={ rotoAiStyle[ 'roto-percent' ] }>
          <div className={ rotoAiStyle[ 'percent-inner' ] }>
            <label>{ filename }</label>
            <div className={ rotoAiStyle[ 'percent' ] }>
              <div>
                <Progress percent={ aiRotoPercent } />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
