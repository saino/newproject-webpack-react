export function get (key) {
  let val;

  if (localStorage) {
    val = localStorage.getItem(key);

    if (val == 'null' || val == 'undefined') {
      return void 0;
    }

    if (val == '') {
      return '';
    }

    return JSON.parse(val);
  }

  return void 0;
}

export function set (key, val) {
  if (localStorage) {
    localStorage.setItem(key, JSON.stringify(val));
  }
}

export function deleteToken (key) {
  if (localStorage) {
    localStorage.removeItem(key);
  }
}
