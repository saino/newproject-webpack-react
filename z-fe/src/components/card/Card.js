/**
 * @desc 卡片项
 */

import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends ( PureComponent || Component ) {
  static propTypes = {
    style: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    cover: PropTypes.element.isRequired,
    actions: PropTypes.array.isRequired,
    actionTAlign: PropTypes.oneOf([ 'left', 'center', 'right' ])
  };
  static defaultProps = {
    actionTAlign: 'center'
  };

  getActions(actions) {
    if (!actions || !actions.length) {
      return null;
    }

    return actions.map((action, index) => (
        <li key={ `action-${ index }` }>{ action }</li>
      )
    );
  }

  render() {
    const { style, title, cover, actions, actionTAlign } = this.props;
    const coverDom = (<div>{ cover }</div>);
    const suffixClassName = `card-actions-${ actionTAlign }`;

    return (
      <div className="card" style={ style }>
        <div className="card-cover">{ coverDom }</div>
        <div className="card-body" title={ title }>{ title }</div>
        <ul className={ `card-actions ${ suffixClassName }` }>{ this.getActions(actions) }</ul>

        <style>{`
          .card-cover {
            position: relative;
            padding-top: 55%;
          }
          .card-cover img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: block;
            vertical-align: top;
            object-fit: contain;
          }
          .card-body {
            padding: 6%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color: rgba(0, 0, 0, 0.85);
          }
          .card-actions {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            padding-bottom: 6%;
          }
          .card-actions-left {
            justify-content: flex-start;
          }
          .card-actions-center {
            justify-content: center;
          }
          .card-actions-right {
            justify-content: flex-end;
          }
        `}</style>
      </div>
    );
  }
}
