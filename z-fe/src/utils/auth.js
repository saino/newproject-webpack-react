export const getAuth = () =>
  JSON.parse(localStorage.getItem('auth'));

export const setAuth = (token, expired) =>
  localStorage.setItem('auth', JSON.stringify({ token, expired }));

export const removeAuth = () =>
  localStorage.removeItem('auth');

export const checkExpiredStatus = () => {
  const { token, expired } = getAuth() || {};
  const currTime = Date.now();
  const diffTime = currTime - expired;

  if (!token || diffTime >= 0)
    return true;

  return false;
}
