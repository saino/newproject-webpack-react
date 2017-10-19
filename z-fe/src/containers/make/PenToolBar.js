import React, { Component } from 'react';
import penPNG from '../../statics/pen_icon.png';
import movePNG from '../../statics/move_icon.png';
import addNotePNG from '../../statics/add_note_icon.png';
import removeNotePNG from '../../statics/remove_note_icon.png';
import maskNotePNG from '../../statics/mask_icon.png';
import completeNotePNG from '../../statics/pick_complete_icon.png';

export default class TransformTollbar extends Component {
  render() {
    return (
      <div className="transform-toolbar">
        <span><img src={ penPNG } /></span>
        <span><img src={ movePNG } /></span>
        <span><img src={ addNotePNG } /></span>
        <span><img src={ removeNotePNG } /></span>
        <span><img src={ maskNotePNG } /></span>
        <span><img src={ completeNotePNG } /></span>
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
