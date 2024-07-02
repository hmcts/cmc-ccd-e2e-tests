import BaseSteps from "../../../base/base-steps";
import { AllMethodsStep } from "../../../decorators/test-steps";
import ResponseFactory from "../../../pages/citizen/response/common/response-factory";
import TestData from "../../../types/test-data";
import ResponseSteps from "./response-steps";

@AllMethodsStep
export default class ClaimantResponseSteps extends ResponseSteps {

  constructor(responseFactory: ResponseFactory, testData: TestData) {
    super(responseFactory, testData);
  }

}