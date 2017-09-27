import React, { cloneElement } from 'react';

export defaunt (child, parent, errorMsg) => {
  const { name, value, onKeyUp } = child.props;

  return cloneElement(child, {

    value,

    onChange: evt =>
      parent.validateChangeOrBlur(name, evt),

    onKeyUp: evt => {
      onKeyUp && onKeyUp(evt);

      if (evt.keyCode != 13)
        return;

      parent.validate(name);

    }

  });

};
