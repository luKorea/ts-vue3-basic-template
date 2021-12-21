import type { AxiosInstance } from "axios";
import type { ILoadingInstance } from "element-plus/lib/el-loading/src/loading.type";
import axios from "axios";
import { ElLoading } from "element-plus";

import { KoreaRequestConfig, KoreaInterceptors } from "./type";

const DEFAULT_LOADING = true;

class KoreaRequest {
  instance: AxiosInstance;
  interceptors?: KoreaInterceptors;
  showLoading?: boolean;
  loading?: ILoadingInstance;

  constructor(config: KoreaRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);
    // 保存基本信息
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    // 单个实例请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    );
    // 单个实例响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.requestInterceptorsCatch
    );
    //  全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "加载中",
            background: "rgba(0,0,0,.4)",
            spinner: "",
          });
        }
        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        this.loading?.close();
        return response.data;
      },
      (error) => {
        this.loading?.close();
        return error;
      }
    );
  }

  /**
   * @description request 请求
   * @param config
   */
  request<T>(config: KoreaRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      // 判断是否需要显示loading效果
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据处理
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }
          this.showLoading = DEFAULT_LOADING;
          // 将结果返回
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }

  get<T>(config: KoreaRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T>(config: KoreaRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T>(config: KoreaRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T>(config: KoreaRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }

  put<T>(config: KoreaRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }

  options<T>(config: KoreaRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "OPTIONS" });
  }

  purge<T>(config: KoreaRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PURGE" });
  }

  head<T>(config: KoreaRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "HEAD" });
  }

  link<T>(config: KoreaRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "LINK" });
  }

  unlink<T>(config: KoreaRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "UNLINK" });
  }
}

export default KoreaRequest;
