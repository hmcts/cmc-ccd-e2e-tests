import DecoratorError from "../errors/decorator-error";
import DecoratorHelper from "../helpers/decorator-helper";

const verifyParamNames = (methodName: string, actualParamNames: string[], paramNamesToCheck: string[]) => {
  for(const paramName of paramNamesToCheck) {
    if(!actualParamNames.includes(paramName)) {
      throw new DecoratorError(`${paramName} is not a parameter on ${methodName}`)
    }
  }
}

const checkTruthy = (paramName: string, argsValue: any, falsyParams: string[]) => {
  if(!argsValue) {
    falsyParams.push(paramName);
  }
}

const filterAndValidate = (paramNamesToCheck: string[], methodParamNames: string[], argsValues: any[], methodName: string, className: string) => {
  const falsyParams: string[] = []
  if(paramNamesToCheck.length === 0) {
    for(const [index, methodParamName] of methodParamNames.entries()) {
      checkTruthy(methodParamName, argsValues[index], falsyParams);
    }
  } else {
    for(const paramName of paramNamesToCheck) {
      const index = methodParamNames.indexOf(paramName);
      checkTruthy(paramName, argsValues[index], falsyParams);
    }
  }
  if(falsyParams.length > 0) {
    className = DecoratorHelper.formatClassName(className)
    throw new TypeError(`args: (${falsyParams.join(', ')}) must be truthy on '${className}.${methodName}' method`);
  }
}

export const TruthyParams = (...paramNamesToCheck: string[]) => {
  return function(target: Function, context: ClassMethodDecoratorContext) {
    const methodParamNames = DecoratorHelper.getParamNamesFromMethod(target.toString());
    verifyParamNames(target.name, methodParamNames, paramNamesToCheck);

    if(target.constructor.name === 'AsyncFunction') {
      return async function asyncReplacementMethod(this: any, ...args: any[]) {
        filterAndValidate(paramNamesToCheck, methodParamNames, args, target.name, this.constructor.name);
        return await target.call(this, ...args);
      }
    }
    return function replacementMethod(this: any, ...args: any[]) {
      filterAndValidate(paramNamesToCheck, methodParamNames, args, target.name, this.constructor.name);
      return target.call(this, ...args);
    }
  }
}