export function get (key) {
  let token;

  if (localStorage) {
    token = localStorage.getItem(key);

    if (token == null) {
      return void 0;
    }

    return token;
  }

  return void 0;
}

export function set (key, val) {
  if (localStorage) {
    localStorage.setItem(key, val);
  }
}

export function deleteToken (key) {
  if (localStorage) {
    localStorage.removeItem(key);
  }
}
