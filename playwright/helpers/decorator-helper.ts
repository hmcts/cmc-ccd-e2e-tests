export default class DecoratorHelper {
  static formatClassName = (className: string) => {
    if(className.endsWith('Steps')) {
      return className;
    }
    return className.charAt(0).toLowerCase() + className.slice(1);
  };

  static getParamNamesFromMethod = (methodString: string) => {
    const argsMatch = methodString.match(/\(([^)]*)\)/);
    if (!argsMatch) {
      return [];
    }
    const argsString = argsMatch[1];
    return argsString.split(',').map(arg => arg.trim()).filter(arg => arg !== '');
  }
}