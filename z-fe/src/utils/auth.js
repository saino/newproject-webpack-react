export const getAuth = () =>
  JSON.parse(localStorage.getItem('auth'));

export const setAuth = (token, user) =>
  localStorage.setItem('auth', JSON.stringify({ token, user }));

export const removeAuth = () =>
  localStorage.removeItem('auth');

export const checkExpiredStatus = () => {
  const { token, user = {} } = getAuth() || {};
  const currTime = Date.now();
  const diffTime = currTime - user.exp;

  if (!token || diffTime >= 0)
    return true;

  return false;
}
