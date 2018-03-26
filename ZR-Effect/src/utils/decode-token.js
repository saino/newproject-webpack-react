import config from '../config';
import jwt from 'jwt-simple';

export default function decodeToken (token) {
  return jwt.decode(token, config.user.secret, true, config.user.secretType);
}
