import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

export enum ServiceAPI {
  DeliveryPlatform
}

export const headers = {
  provider: 'provider',
  authorization: 'Authorization',
};

class AxiosInstanceManager {
  private readonly instances: Map<ServiceAPI, AxiosInstance> = new Map();
  private readonly defaultConfig: CreateAxiosDefaults = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
  };
  createInstance(name: ServiceAPI, config: AxiosRequestConfig): AxiosInstance {
    const instance = axios.create({ 
      ...this.defaultConfig, 
      ...config,
      headers: {
        ...this.defaultConfig.headers,
        ...config.headers
      }
    });

    instance.interceptors.request.use(request => {
      return request;
    });

    // Log les réponses
    instance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        console.error('Error details:', {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        throw error;
      }
    );

    this.instances.set(name, instance);
    return instance;
  }

  getInstance(name: ServiceAPI): AxiosInstance {
    const instance = this.instances.get(name);
    if (!instance) {
      throw new Error(`Instance with name ${name} does not exist.`);
    }
    return instance;
  }
}

const manager = new AxiosInstanceManager();
manager.createInstance(ServiceAPI.DeliveryPlatform, { 
  baseURL: 'https://localhost:28110/api/',
  withCredentials: true
});

export default manager;