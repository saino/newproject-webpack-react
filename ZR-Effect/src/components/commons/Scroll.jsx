import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollArea from 'react-custom-scrollbars';

export default class Scroll extends Component {
  static propTypes = {
    onScrollToBottom: PropTypes.func.isRequired,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  };

  scrollToBottomHandle = ({ clientHeight, scrollTop, scrollHeight }) => {
    const { onScrollToBottom } = this.props;

    if (clientHeight + scrollTop >= scrollHeight) {
      onScrollToBottom();
    }
  };

  render() {
    const { width, height, children } = this.props;

    return (
      <ScrollArea style={{ width, height }} onScrollFrame={ this.scrollToBottomHandle }>
        { children }
      </ScrollArea>
    );
  }
}
