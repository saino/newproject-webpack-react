import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

function clearPreDev (evt) {
  evt.stopPropagation();
  evt.preventDefault();
}

export default class Scrollbar extends PureComponent {
  static propTypes = { layout: PropTypes.string };
  static defaultProps = { layout: 'horizontal' };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      scrollbarHandlerStartPos: 0,
      scrollbarHandlerEndPos: 0
    };

    this.dragstartHandle = null;
    this.childrenSize = null;
    this.ratio = 0;
    this.initScrollbarHandlerStartPos = this.immutableScrollbarHandlerStartPos = 0;
    this.initScrollbarHandlerEndPos = this.immutableScrollbarHandlerEndPos = 0;

    this.receiveChildrenActualSize = size => {
      this.childrenSize = size;
      this.visibleScrollbarHandler();
      this.calcScrollbarHandlerPos();

      setTimeout(() => {
        if (this.state.visible) {
          const scrollEl = findDOMNode(this.refs.scroll);

          this.dragstartHandle = this.generateScrollbarHandlerDragstartHandle();
          scrollEl.addEventListener('mousedown', this.dragstartHandle, false);
        }
      }, 0);
    };
  }

  /**
   * 是否出现滚动处理条
   */
  isVisiblebarHandler() {
    const isVertical = this.props.layout === 'vertical';
    const { width, height } = this.childrenSize;
    const conEl = findDOMNode(this.refs.content);

    return isVertical
      ? conEl.clientHeight < height
      : conEl.clientWidth < width;
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
    const contentEl = findDOMNode(this.refs.content);
    const children = findDOMNode(this.refs.ci);

    if (this.isVisiblebarHandler()) {
      this.ratio = (isVertical
        ? contentEl.clientHeight / children.clientHeight
        : contentEl.clientWidth / children.clientWidth).toFixed(6);

      this.initScrollbarHandlerEndPos = this.immutableScrollbarHandlerEndPos = parseFloat((1 - parseFloat(this.ratio)).toFixed(6));
      this.setState({
        scrollbarHandlerEndPos: this.immutableScrollbarHandlerEndPos
      });
    }
  }

  /**
   * 滚动处理条拖动事件
  */
  generateScrollbarHandlerDragstartHandle() {
    let currX, currY, offsetX, offsetY;
    let context = this;

    function dragStart ({ clientX, clientY }) {
      const { ownerDocument } = findDOMNode(context);

      currX = clientX;
      currY = clientY;

      ownerDocument.addEventListener('selectstart', clearPreDev);
      ownerDocument.addEventListener('dragstart', clearPreDev);
      ownerDocument.addEventListener('mousemove', dragMove, false);
      ownerDocument.addEventListener('mouseup', dragEnd, false);
    }

    function dragMove ({ clientX, clientY }) {
      const el = findDOMNode(context);
      const children = findDOMNode(context.refs.ci);
      const scroller = findDOMNode(context.refs.content);

      let scrollbarHandlerStartPos, scrollbarHandlerEndPos;

      if (context.props.layout === 'vertical') {
        offsetY = clientY - currY;
        scrollbarHandlerStartPos = parseFloat((offsetY / (children.clientHeight - el.clientHeight)).toFixed(6));
        scrollbarHandlerEndPos = parseFloat((context.immutableScrollbarHandlerEndPos - scrollbarHandlerStartPos).toFixed(6));
        scroller.scrollTop = 100;
      } else {
        offsetX = clientX - currX;
        scrollbarHandlerStartPos = parseFloat(((offsetX / (children.clientWidth - el.clientWidth))).toFixed(6));
        scrollbarHandlerEndPos = parseFloat((context.immutableScrollbarHandlerEndPos - scrollbarHandlerStartPos).toFixed(6));
        scroller.scrollLeft = scrollbarHandlerStartPos > 0 ? scrollbarHandlerStartPos * children.clientWidth : (context.immutableScrollbarHandlerStartPos + scrollbarHandlerStartPos) * children.clientWidth;
      }

      if (scrollbarHandlerEndPos > context.initScrollbarHandlerEndPos) {
        context.immutableScrollbarHandlerStartPos = 0;
        context.immutableScrollbarHandlerEndPos = context.initScrollbarHandlerEndPos;
        scrollbarHandlerEndPos = context.initScrollbarHandlerEndPos;
        scrollbarHandlerStartPos = 0;
      } else if (scrollbarHandlerEndPos < 0) {
        context.immutableScrollbarHandlerStartPos = context.initScrollbarHandlerEndPos;
        context.immutableScrollbarHandlerEndPos = 0;
        scrollbarHandlerEndPos = 0;
        scrollbarHandlerStartPos = 0;
      }

      context.setState({ scrollbarHandlerStartPos: context.immutableScrollbarHandlerStartPos + scrollbarHandlerStartPos, scrollbarHandlerEndPos });
    }

    function dragEnd () {
      const { ownerDocument } = findDOMNode(context);
      const { scrollbarHandlerStartPos, scrollbarHandlerEndPos } = context.state;

      context.immutableScrollbarHandlerStartPos = scrollbarHandlerStartPos;
      context.immutableScrollbarHandlerEndPos = scrollbarHandlerEndPos;

      ownerDocument.removeEventListener('selectstart', clearPreDev);
      ownerDocument.removeEventListener('dragstart', clearPreDev);
      ownerDocument.removeEventListener('mousemove', dragMove, false);
      ownerDocument.removeEventListener('mouseup', dragEnd, false);
    }

    return dragStart;
  }

  render() {
    const { visible, scrollbarHandlerStartPos, scrollbarHandlerEndPos } = this.state;
    const { layout, children } = this.props;

    return (
      <div className="free-scrollbar">
        <div className={ `free-scrollbar-inner ${ layout }` }>

          {/* 滚动内容 */}
          <div ref="content" className="free-scrollbar-content">
            { cloneElement(Children.only(children), { getSize: this.receiveChildrenActualSize, ref: 'ci', ...children.props }) }
          </div>

          { visible
              ? (
                /* 自定义滚动元素 */
                <div className="free-scrollbar-track">
                  <span
                    ref="scroll"
                    className="free-scrollbar-track-handler"
                    style={
                      layout === 'vertical'
                        ? { top: `${ scrollbarHandlerStartPos * 100 }%`, bottom: `${ scrollbarHandlerEndPos * 100 }%` }
                        : { left: `${ scrollbarHandlerStartPos * 100 }%`, right: `${ scrollbarHandlerEndPos * 100 }%` } }></span>
                </div>
              )
              : void 0
          }
        </div>

        {/* 样式 */}
        <style>{`

          .free-scrollbar {
            width: 100%;
            height: 100%;
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
            position: relative;
            overflow: hidden;
          }

          .free-scrollbar-track {
            flex: 0 0 8px;
            position: relative;
            box-sizing: border-box;
            background: rgba(250, 250, 250, .25);
            border-radius: 5px;
          }

          .free-scrollbar-track-handler {
            position: absolute;
            left: 0;
            top: 0;
            background: rgba(0,0,0,.65);
            border-radius: 5px;
          }

          .free-scrollbar-inner.horizontal {
            flex-flow: column nowrap;
          }

          .free-scrollbar-inner.vertical {
            flex-flow: row nowrap;
          }

          /*.free-scrollbar-inner.horizontal .free-scrollbar-track {
            border-top: 1px solid rgb(232, 232, 232);
          }*/

          .free-scrollbar-inner.horizontal .free-scrollbar-track-handler {
            height: 100%;
          }

          /*.free-scrollbar-inner.vertical .free-scrollbar-track {
            border-left: 1px solid rgb(232, 232, 232);
          }*/

          .free-scrollbar-inner.vertical .free-scrollbar-track-handler {
            width: 100%;
          }

        `}</style>

      </div>
    );
  }

  componentWillUnmount() {
    const scrollEl = findDOMNode(this.refs.scroll);

    if (this.state.visible) {
      scrollEl.removeEventListener('mousedown', this.dragstartHandle, false);
    }
  }
}
