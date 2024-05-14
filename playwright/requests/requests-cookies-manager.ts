import { Cookie } from 'playwright-core';
import FileSystemHelper from '../helpers/file-system-helper';
import User from '../types/user';
import FileType from '../enums/file-type';
import { AllMethodsStep } from '../decorators/test-steps';
import UserRole from '../enums/user-role';

@AllMethodsStep
export default class RequestsCookiesManager {
  async getAccessToken({cookiesPath, role}: User) {
    const cookies: Cookie[] = FileSystemHelper.readFile(cookiesPath, FileType.JSON);
    if(role === UserRole.CITIZEN) {
      return cookies.find(cookie => cookie.name === 'SESSION_ID')!.value;
    }
    return cookies.find(cookie => cookie.name === '__auth__')!.value;
  }

  async getUserId({cookiesPath, role}: User) {
    const cookies: Cookie[] = FileSystemHelper.readFile(cookiesPath, FileType.JSON);
    if(role === UserRole.CITIZEN) {
      throw new Error('User Id cannot be access via cookies a test project setup process will need to be created to stored this before tests commence.');
    }
    return cookies.find(cookie => cookie.name === '__userid__')!.value;
  }
}