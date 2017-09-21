export const getOuterWidth = (el) => {
  let width = el.offsetWidth;
  const computedStyle = document.defaultView.getComputedStyle(el, null);

  width += computedStyle.getPropertyValue('margin-left');
  width += computedStyle.getPropertyValue('margin-right');

  return width;
};

export const getOuterHeight = (el) => {
  let height = el.offsetHeight;
  const computedStyle = document.defaultView.getComputedStyle(el, null);

  height += computedStyle.getPropertyValue('margin-top');
  height += computedStyle.getPropertyValue('margin-bottom');

  return height;
};

export const getInnerWidth = (el) => el.clientWidth;

export const getInnerHeight = (el) => el.clientHeight;
