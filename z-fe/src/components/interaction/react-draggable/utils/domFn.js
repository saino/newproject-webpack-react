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

export function matchesSelector(el, selector) {
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }
    return el.matches.call(el, selector);
}

export function matchesSelectorAndParentsTo(el, selector, baseNode){
    let node = el;
    do {
        if (matchesSelector(node, selector)) return true;
        if (node === baseNode) return false;
        node = node.parentNode;
    } while (node);

    return false;
}