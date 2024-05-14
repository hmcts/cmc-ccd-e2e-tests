import DecoratorError from '../errors/decorator-error';
import {test} from '../playwright-fixtures/index'

const formatClassName = (className: string) => {
  if(className.endsWith('Steps')) {
    return className;
  }
  return className.charAt(0).toLowerCase() + className.slice(1);
}

export const Step = (target: Function, context: ClassMethodDecoratorContext) => {
  if (target.prototype && target.prototype['__allMethodsStepApplied']) {
    throw new DecoratorError(`${Step.name} decorator cannot be applied when @${AllMethodsStep.name} decorator is already applied.`);
  }
  if(target.constructor.name !== 'AsyncFunction') {
    throw new DecoratorError(`Method must be asynchronous to use @${Step.name} decorator`);
  }
  return function replacementMethod(...args: any) {
    const stepName = formatClassName(this.constructor.name) + '.' + (context.name as string);
    return test.step(stepName, async () => {
      return await target.call(this, ...args);
    });
  };
}

export const AllMethodsStep = (target: Function) => {
  const targetClass = target;
  targetClass.prototype['__allMethodsStepApplied'] = true;

  for (const methodName of Object.getOwnPropertyNames(targetClass.prototype)) {
    const method = targetClass.prototype[methodName];

    if (typeof method === 'function' && methodName !== 'constructor') {
      const stepName = formatClassName(targetClass.name) + '.' + methodName;
      if(method.constructor.name !== 'AsyncFunction') {
        throw new DecoratorError(`All methods defined in ${targetClass.name} must be asynchronous to use @${AllMethodsStep.name} decorator`);
      }
      targetClass.prototype[methodName] = async function(...args: any[]) {
        return test.step(stepName, async () => {
          return await method.apply(this, args);
      });
      }
    }
  }
}

//add soft assertions to idam cookies banner and exui cookies banner and citizen cookies banner