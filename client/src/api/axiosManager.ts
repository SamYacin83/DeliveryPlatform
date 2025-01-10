import axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

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
      'Accept': 'application/json'
    },
    withCredentials: true
  };

  createInstance(name: ServiceAPI, config: AxiosRequestConfig): AxiosInstance {
    if (this.instances.has(name)) {
      throw new Error(`Instance with name ${name} already exists.`);
    }
    const instance = axios.create({ 
      ...this.defaultConfig, 
      ...config,
    });

    // Log les requêtes
    instance.interceptors.request.use(request => {
      console.log('Request:', {
        url: request.url,
        cookies: document.cookie
      });
      return request;
    });

    // Log les réponses
    instance.interceptors.response.use(
      response => {
        console.log('Response:', {
          url: response.config.url,
          status: response.status,
          cookies: response.headers['set-cookie']
        });
        return response;
      },
      error => {
        console.error('Error:', {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data
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
manager.createInstance(ServiceAPI.DeliveryPlatform, { baseURL: 'https://localhost:28110/api/' });

export default manager;