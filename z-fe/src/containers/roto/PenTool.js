import React, { Component } from 'react';
import { Tooltip } from 'antd';
import penPNG from '../../statics/pen_icon.png';
import movePNG from '../../statics/move_icon.png';
import addNodePNG from '../../statics/add_note_icon.png';
import removeNodePNG from '../../statics/remove_note_icon.png';
import maskPNG from '../../statics/mask_icon.png';
import completePNG from '../../statics/pick_complete_icon.png';

export default class PenTool extends Component {
  render() {
    return (
      <div className="transform-toolbar">
        <span><Tooltip title="打开钢笔工具"><img src={ penPNG } /></Tooltip></span>
        <span><Tooltip title="移动节点"><img src={ movePNG } /></Tooltip></span>
        <span><Tooltip title="添加节点"><img src={ addNodePNG } /></Tooltip></span>
        <span><Tooltip title="删除节点"><img src={ removeNodePNG } /></Tooltip></span>
        <span><Tooltip title="添加蒙层"><img src={ maskPNG } /></Tooltip></span>
        <span><Tooltip title="完成"><img src={ completePNG } /></Tooltip></span>
        <style>{`
          .transform-toolbar {
            padding: 12px;
            display: flex;
            flex-flow: column nowrap;
            align-items: stretch;
          }

          .transform-toolbar span {
            display: block;
            width: 100%;
            height: 100%;
            cursor: pointer;
            margin: 8px 0;
          }

          .transform-toolbar span img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}
