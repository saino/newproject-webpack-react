import React, { cloneElement } from 'react';

export default (child, parent) => {
  return cloneElement(child, {

    ...child.props,

    onClick: () => parent.onSubmit(child.props.name)

  });
}
