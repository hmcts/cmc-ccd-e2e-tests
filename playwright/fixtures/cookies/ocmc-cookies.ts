import Cookie from '../../types/cookie';
import urls, { getDomain } from '../../config/urls';

export const acceptOcmcCookies: Cookie[] = [
  {
    name: 'cmc-cookie-preferences',
    value: '{"analytics":"on","apm":"on"}',
    domain: getDomain(urls.ocmcFrontEnd),
    path: '/',
  },
];
