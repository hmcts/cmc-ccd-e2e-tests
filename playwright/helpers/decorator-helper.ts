import DecoratorError from "../errors/decorator-error";

export default class DecoratorHelper {
  private static methodNameToMethodParams = {};

  static verifyParamNames = (className: string, methodName: string, actualParamNames: string[], paramNamesToCheck: string[]) => {
    for(const paramName of paramNamesToCheck) {
      if(!actualParamNames.includes(paramName)) {
        throw new DecoratorError(`${paramName} is not a parameter on ${className}.${methodName}`);
      }
    }
  };

  static formatClassName = (className: string) => {
    if(className.endsWith('Steps')) {
      return className;
    }
    return className.charAt(0).toLowerCase() + className.slice(1);
  };

  static getParamNamesFromMethod = (classKey: string, methodName: string, target: Function) => {
    let methodParams = this.methodNameToMethodParams[classKey]?.[methodName];
    if(!methodParams) {
      const methodString = target.toString();
      const argsMatch = methodString.match(/\(([^)]*)\)/);
      if (!argsMatch) {
        return [];
      }
      const argsString = argsMatch[1];
      methodParams = argsString.split(',').map(arg => arg.trim()).filter(arg => arg !== '');

      if (!this.methodNameToMethodParams[classKey]) {
        this.methodNameToMethodParams[classKey] = {}; 
    }

      this.methodNameToMethodParams[classKey][methodName] = methodParams
    }
    return methodParams;
  };

  static formatArg = (arg: any) => {
    if(typeof arg === 'string') {
      return `'${arg}'`;
    }
    return arg;
  };
}
