const getBindCategory = (fn) => {
  let tempEl = document.createElement('div'), isDOM2, addEventListener, removeEventListener;

  if (tempEl.addEventListener) {
    isDOM2 = true;
  } else {
    isDOM2 = false;
  }

  addEventListener = tempEl.addEventListener || tempEl.attachEvent;
  removeEventListener = tempEl.removeEventListener || tempEl.detachEvent;

  return (el, evtName, handler) => {
    if (!el)
      return;

    let params = [ addEventListener, removeEventListener, el, `${ isDOM2 ? '' : 'on' }${ evtName }`, handler ];

    return fn.apply(null, params);
  };
};

export const addEvent = getBindCategory(function (addEventListener, _, el, evtName, handler) {
  addEventListener.call(el, evtName, handler, false);
});

export const removeEvent = getBindCategory(function (_, removeEventListener, el, evtName, handler) {
  removeEventListener.call(el, evtName, handler, false);
});
