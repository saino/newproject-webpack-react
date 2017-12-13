/**
 * 处理React-Router-Dom的Link、NavLink无法支持id锚点
 */

export function scrollToAnchor () {
  const hashPart = decodeURIComponent(window.location.hash).split('#');
  let el;

  if (hashPart.length > 1) {
    el = document.getElementById(hashPart.pop());

    if (el) {
      el.scrollIntoView();
    }
  }
}
