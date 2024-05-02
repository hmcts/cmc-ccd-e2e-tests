type RequestOptions = {
  readonly url: string;
  readonly headers?: Record<string, string>;
  readonly body?: Record<string, any>;
  readonly method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
};

export default RequestOptions;
