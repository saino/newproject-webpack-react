import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

export default class Scrollbar extends PureComponent {
  static propTypes = { layout: PropTypes.string };
  static defaultProps = { layout: 'horizontal' };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      scrollbarHandlerPos: 0
    };

    this.posEl = null;
    this.scrollEl = null;
    this.dragstartHandle = null;
  }

  /**
   * 是否出现滚动处理条
   */
  isVisiblebarHandler() {
    const isVertical = this.props.layout === 'vertical';
    const children = findDOMNode(this.props.children);

    return isVertical
      ? this.posEl.clientHeight < children.clientHeight
      : this.posEl.clientWidth < children.clientWidth;
  }

  visibleScrollbarHandler() {
    this.setState({
      visible: this.isVisiblebarHandler()
    });
  }

  /**
   * 计算滚动处理条在horizontal/vertical布局下的位置
   */
  calcScrollbarHandlerPos() {
    const isVertical = this.props.layout === 'vertical';
    const children = findDOMNode(this.props.children);
    let ratio;

    if (this.isVisiblebarHandler()) {
      ratio = (isVertical
        ? this.posEl.clientHeight / children.clientHeight
        : this.posEl.clientWidth / children.clientWidth).toFixed(6);

      this.setState({ scrollbarHandlerPos: parseFloat((1 - parseFloat(ratio)).toFixed(6)) });
    }
  }

  /**
   * 滚动处理条拖动事件
  */
  generateScrollbarHandlerDragstartHandle() {
    let currX, currY, offsetX, offsetY;
    let context = this;

    function dragStart ({ clientX, clientY }) {
      currX = clientX;
      currY = clientY;

      document.addEventListener('mouseover', dragMove, false);
      document.addEventListener('mouseout', dragEnd, false);
    }

    function dragMove ({ clientX, clientY }) {
      if (context.props.layout === 'vertical') {
        offsetX = clientX - currX;
      }
    }

    function dragEnd () {

    }

    return dragStart;
  }

  render() {
    const { visible, scrollbarHandlerPos } = this.state;
    const { layout, children } = this.props;

    return (
      <div className="free-scrollbar">
        <div className={ `free-scrollbar-inner ${ layout }` }>

          {{/* 滚动内容 */}}
          <div ref={ el => this.posEl = el } className="free-scrollbar-content">
            { Children.only(children) }
          </div>

          { visible
              ? (
                {{/* 自定义滚动元素 */}}
                <div className="free-scrollbar-track">
                  <span
                    ref={ el => this.scrollEl = el }
                    className="free-scrollbar-track-handler"
                    style={
                      layout === 'vertical'
                        ? { bottom: `${ scrollbarHandlerPos * 100 }%` }
                        : { right: `${ scrollbarHandlerPos * 100 }%` } }></span>
                </div>
              )
              : void 0
          }

        </div>

        {{/* 样式 */}}
        <style>`{

          .free-scrollbar {
            width: 100%;
            height: 100%;
            overflow: 'hidden',
            position: 'relative'
          }

          .free-scrollbar-inner {
            display: flex;
            height: 100%;
            justify-content: flex-start;
            align-items: stretch;
          }

          .free-scrollbar-content {
            flex: 1;
            height: 100%;
            overflow: scroll;
          }

          .free-scrollbar-track {
            flex: 0 0 10px;
            position: relative;
            box-sizing: border-box;
            background: rgb(250, 250, 250);
          }

          .free-scrollbar-track-handler {
            position: absolute;
            left: 0;
            top: 0;
            background: rgb(193, 193, 193);
            border-radius: 5px;
          }

          .free-scrollbar-inner.horizontal {
            flex-flow: column nowrap;
          }

          .free-scrollbar-inner.vertical {
            flex-flow: row nowrap;
          }

          .free-scrollbar-inner.horizontal .free-scrollbar-track {
            border-top: 1px solid rgb(232, 232, 232);
          }

          .free-scrollbar-inner.horizontal .free-scrollbar-track-handler {
            height: 100%;
          }

          .free-scrollbar-inner.vertical .free-scrollbar-track {
            border-left: 1px solid rgb(232, 232, 232);
          }

          .free-scrollbar-inner.vertical .free-scrollbar-track-handler {
            width: 100%;
          }

        }`</style>

      </div>
    );
  }

  componentDidMount() {
    this.visibleScrollbarHandler();
    this.calcScrollbarHandlerPos();

    setTimeout(() => {
      if (this.state.visible) {
        this.dragstartHandle = this.generateScrollbarHandlerDragstartHandle();
        this.scrollEl.addEventListener('mousedown', this.dragstartHandle, false);
      }
    }, 0);

  }

  componentWillUnmount() {
    if (this.state.visible) {
      this.scrollEl.removeEventListener('mousedown', this.dragstartHandle, false);
    }
  }
}
