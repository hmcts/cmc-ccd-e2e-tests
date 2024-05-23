import DecoratorError from '../errors/decorator-error';
import DecoratorHelper from '../helpers/decorator-helper';
import {test} from '../playwright-fixtures/index';

// eslint-disable-next-line @typescript-eslint/ban-types
export const Step = (target: Function, context: ClassMethodDecoratorContext) => {
  if (target.prototype && target.prototype['__allMethodsStepApplied']) {
    throw new DecoratorError(`${Step.name} decorator cannot be applied when @${AllMethodsStep.name} decorator is already applied.`);
  }
  if(target.constructor.name !== 'AsyncFunction') {
    throw new DecoratorError(`Method must be asynchronous to use @${Step.name} decorator`);
  }
  return async function replacementMethod(this: any, ...args: any) {
    const stepName = DecoratorHelper.formatClassName(this.constructor.name) + '.' + (context.name as string);
    return await test.step(stepName, async () => {
      return await target.call(this, ...args);
    });
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const AllMethodsStep = (target: Function, context: ClassDecoratorContext) => {
  const targetClass = target;
  targetClass.prototype['__allMethodsStepApplied'] = true;

  for (const methodName of Object.getOwnPropertyNames(targetClass.prototype)) {
    const method = targetClass.prototype[methodName];

    if (typeof method === 'function' && methodName !== 'constructor') {
      const stepName = DecoratorHelper.formatClassName(targetClass.name) + '.' + methodName;
      if(method.constructor.name !== 'AsyncFunction') {
        throw new DecoratorError(`All methods defined in ${targetClass.name} must be asynchronous to use @${AllMethodsStep.name} decorator`);
      }
      targetClass.prototype[methodName] = async function(...args: any[]) {
        return await test.step(stepName, async () => {
          return await method.apply(this, args);
        });
      };
    }
  }
};

//add soft assertions to idam cookies banner and exui cookies banner and citizen cookies banner