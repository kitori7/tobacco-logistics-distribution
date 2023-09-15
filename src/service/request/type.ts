import type { AxiosRequestConfig, AxiosResponse } from "axios";
//针对AxiosRequestConfig配置进行拓展
export interface HYInterceptor<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestFailureFn?: (err: any) => any;
  responseSuccessFn?: (res: T) => T;
  responseFailureFn?: (err: any) => any;
}
export interface requestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  //传入拦截器
  interceptors?: HYInterceptor<T>;
}
