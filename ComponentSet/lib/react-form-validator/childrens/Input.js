import React, { cloneElement } from 'react';

const color = '#ff0000';

export default (child, parent, value, errorMsg) => {
  const { name, onKeyUp } = child.props;
  const style = errorMsg ? { borderColor: color } : void 0;

  return cloneElement(child, {

    value,

    style,

    children: errorMsg ? (<div style={{ color, marginTop: 10 }}>{ errorMsg }</div>) : void 0,

    onBlur: evt =>
      parent.validate(name, value),

    onChange: evt =>
      parent.onChange(name, evt),

    onKeyUp: evt => {
      onKeyUp && onKeyUp(evt);

      if (evt.keyCode != 13)
        return;

      parent.validate(name, value);

    }

  });

};
