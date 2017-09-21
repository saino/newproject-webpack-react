import React from 'react';
import ReactDOM from 'react-dom';
import ReactDraggable from '../lib/ReactDraggable/Draggable';

ReactDOM.render(
  <ReactDraggable
    position={{ x: 0, y: 0 }}
    className="ss"
    style={{ width: 200, height: 300 }}>
    <div style={{ background: 'skyblue', textAlign: 'center', lineHeight: '300px' }}>XXOO</div>
  </ReactDraggable>,

  document.querySelector('#app')
);
