import BaseRequest from '../base/base-request';
import { TOTP } from 'totp-generator';
import { AllMethodsStep } from '../decorators/test-steps';
import config from '../config/config';
import RequestOptions from '../models/api/request-options';
import urls from '../config/urls';

export default function ServiceAuthProviderRequests<
  TBase extends abstract new (...args: any[]) => BaseRequest,
>(Base: TBase) {
  @AllMethodsStep()
  abstract class ServiceAuthProviderRequests extends Base {
    private static s2sToken: string;

    async fetchS2sToken() {
      if (!ServiceAuthProviderRequests.s2sToken) {
        console.log('Fetching s2s token...');
        const url = `${urls.authProviderApi}/lease`;
        const requestOptions: RequestOptions = {
          method: 'POST',
          body: {
            microservice: config.s2s.microservice,
            oneTimePassword: TOTP.generate(config.s2s.secret).otp,
          },
        };
        const responseText = await super.retryRequestText(url, requestOptions);
        console.log('s2s token fetched successfully');
        ServiceAuthProviderRequests.s2sToken = responseText;
      }
      return ServiceAuthProviderRequests.s2sToken;
    }
  }

  return ServiceAuthProviderRequests;
}
