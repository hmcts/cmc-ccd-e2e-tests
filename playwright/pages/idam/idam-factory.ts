import LoginPage from './login/login-page';
import BaseFactory from '../base-factory';
import CookiesManager from './cookies-manager/cookies-manager';

export default abstract class IdamFactory extends BaseFactory{
  
  get cookiesManager() {
    return new CookiesManager(this.page);
  }
 
  get loginPage() {
    return new LoginPage(this.page);
  }
}