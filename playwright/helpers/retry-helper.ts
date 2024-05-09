const MAX_RETRY_TIMEOUT = 30000;

//This class will soon become deprecated

export default class RetryHelper {
  static retry = async (
    fn: () => Promise<any>,
    remainingRetries = 3,
    retryTimeout = 5000,
    err = null,
  ) => {
    if (!remainingRetries) {
      return Promise.reject(err);
    }
    if (retryTimeout > MAX_RETRY_TIMEOUT) {
      retryTimeout = MAX_RETRY_TIMEOUT;
    }
    return fn().catch(async (err) => {
      console.log(
        `${err.message}, retrying in ${retryTimeout / 1000} seconds (Retries left: ${remainingRetries})`,
      );
      await this.sleep(retryTimeout);
      return this.retry(fn, remainingRetries - 1, retryTimeout, err);
    });
  };

  private static sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
}
