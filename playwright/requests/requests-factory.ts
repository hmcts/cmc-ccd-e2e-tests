import BaseRequestsFactory from "../base/base-requests-factory";
import CCDRequests from "./ccd";
import ClaimStoreRequests from "./claim-store";
import IdamRequests from "./idam";
import RequestsCookiesManager from "./requests-cookies-manager";

export default class RequestsFactory extends BaseRequestsFactory {
  get ccdRequests() {
    return new CCDRequests(this.requestContext);
  }

  get claimsStoreRequests() {
    return new ClaimStoreRequests(this.requestContext);
  }

  get idamRequests() {
    return new IdamRequests(this.requestContext);
  }

  get requestsCookiesManager() {
    return new RequestsCookiesManager();
  }
}