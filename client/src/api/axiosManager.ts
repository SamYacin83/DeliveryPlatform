import axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

export enum ServiceAPI {
  auth,
  echo,
  user,
  organization,
}

export const headers = {
  organizationId: 'organisationId',
  provider: 'provider',
  authorization: 'Authorization',
  token: 'token',
};

class AxiosInstanceManager {
  private readonly instances: Map<ServiceAPI, AxiosInstance> = new Map();
  private readonly interceptors: Map<ServiceAPI, { [key: string]: () => string | undefined }> = new Map();

  private readonly defaultConfig: CreateAxiosDefaults = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  createInstance(name: ServiceAPI, config: AxiosRequestConfig): AxiosInstance {
    if (this.instances.has(name)) {
      throw new Error(`Instance with name ${name} already exists.`);
    }
    const instance = axios.create({ ...this.defaultConfig, ...config });

    instance.interceptors.request.use((requestConfig) => {
      const requestInterceptors = this.interceptors.get(name);
      if (!requestInterceptors) {
        return requestConfig;
      }

      Object.keys(requestInterceptors).forEach((key) => {
        if (!requestInterceptors[key]) {
          return;
        }
        const value = requestInterceptors[key]();
        if (value) {
          requestConfig.headers[key] = value;
        }
      });
      return requestConfig;
    });

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

  setAuthTokenGetter(getToken: () => string | undefined): void {
    this.setRequestInterceptor(ServiceAPI.auth, headers.authorization, () => `Bearer ${getToken()}`);
    this.setRequestInterceptor([ServiceAPI.organization, ServiceAPI.user], headers.token, getToken);
  }

  setRequestInterceptor(name: ServiceAPI | ServiceAPI[], header: string, getValue: () => string | undefined): void {
    const services = Array.isArray(name) ? name : [name];

    services.forEach((service) => {
      if (!this.interceptors.has(service)) {
        this.interceptors.set(service, {});
      }
      this.interceptors.get(service)![header] = getValue;
    });
  }
}

const manager = new AxiosInstanceManager();
manager.createInstance(ServiceAPI.auth, { baseURL: 'https://localhost:28110/api/' });
manager.createInstance(ServiceAPI.echo, { baseURL: import.meta.env.VITE_ECHOIA_BACKEND_URL });
manager.createInstance(ServiceAPI.user, { baseURL: import.meta.env.VITE_MSUSER_BACKEND_URL });
manager.createInstance(ServiceAPI.organization, { baseURL: import.meta.env.VITE_MSORGANISATION_BACKEND_URL });

// Configurer les intercepteurs pour l'authentification
const getToken = () => {
  const token = localStorage.getItem('token');
  return token || undefined;
};
manager.setAuthTokenGetter(getToken);

export default manager;