import React, { Component } from 'react';
import PerfectPick from './PerfectPick';
import PrePick from './PrePick';

export default class Pick extends Component {
  state = {
    index: 0
  };

  render() {
    return (
      <div className="pick">

        <div className="header">{ !this.state.index ? '第一步 ：预抠像' : '第二步 ：精抠像' }</div>

        <div className="main">
          { !this.state.index ?
            (<PrePick onNext={ () => { this.setState({ index: 1 }) } } />) :
            (<PerfectPick onPrev={ () => { this.setState({ index: 0 }) } } />)
          }
        </div>

        <style>{`
          .pick {
            font-size: 14px;
            font-family: 'microsoft yahei';
            display: flex;
            flex-flow: column nowrap;
            align-items: stretch;
          }

          .pick > .header {
            text-align: center;
            line-height: 40px;
            color: #fff;
            background: #2d8bbd;
          }

          .pick > .main {
            flex: 1;
          }

        `}</style>

      </div>
    );
    return !this.state.index ?
      (<PrePick />) : (<PerfectPick />);
  }
}
