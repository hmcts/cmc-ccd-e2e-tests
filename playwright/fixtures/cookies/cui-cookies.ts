import Cookie from '../../models/cookie';
import urls, { getDomain } from '../../config/urls';

export const acceptCuiCookies: Cookie[] = [
  {
    name: 'money-claims-cookie-preferences',
    value: '{"analytics":"on","apm":"on"}',
    domain: getDomain(urls.cuiFrontEnd),
    path: '/',
  },
];
