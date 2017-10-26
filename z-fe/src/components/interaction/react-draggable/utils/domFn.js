export const getOuterWidth = (el) => {
  let width = el.offsetWidth;
  const computedStyle = document.defaultView.getComputedStyle(el, null);

  width += parseFloat(computedStyle.getPropertyValue('margin-left'));
  width += parseFloat(computedStyle.getPropertyValue('margin-right'));

  return width;
};

export const getOuterHeight = (el) => {
  let height = el.offsetHeight;
  const computedStyle = document.defaultView.getComputedStyle(el, null);

  height += parseFloat(computedStyle.getPropertyValue('margin-top'));
  height += parseFloat(computedStyle.getPropertyValue('margin-bottom'));
  
  return height;
};

export const getInnerWidth = (el) => el.clientWidth;

export const getInnerHeight = (el) => el.clientHeight;

export const getPosition = (el) => {
  const computedStyle = document.defaultView.getComputedStyle(el, null);

  return [ parseFloat(computedStyle.getPropertyValue('left')), parseFloat(computedStyle.getPropertyValue('top')) ];
};
