import axios from 'axios';
import RequestOptions from '../../types/RequestOptions';
import RetryHelper from './retry-helper';

export default class RestHelper {
  static request = ({
    url,
    headers = { 'Content-Type': 'application/json' },
    body,
    method = 'POST',
  }: RequestOptions) => {
    return axios.request({
      url: url,
      method: method,
      data: body ? JSON.stringify(body) : undefined,
      headers: headers,
    });
  };

  static retriedRequest = async (
    {
      url,
      headers = { 'Content-Type': 'application/json' },
      body,
      method = 'POST',
    }: RequestOptions,
    expectedStatus = 200,
  ) => {
    return RetryHelper.retry(() => {
      return this.request({ url, headers, body, method }).then((response) => {
        if (response.status !== expectedStatus) {
          throw new Error(
            `Expected status: ${expectedStatus}, actual status: ${response.status}, ` +
              `message: ${response.statusText}, url: ${response.config.url}`,
          );
        }
        return response;
      });
    });
  };
}
