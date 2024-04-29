type RequestOptions = {
  url: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
};

export default RequestOptions;
