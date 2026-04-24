import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined in environment variables');
}

const axiosInstance = async () => {
  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken');
  } 
  else {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      
      token = 
        cookieStore.get('accessToken')?.value || 
        cookieStore.get('token')?.value || 
        null;
    } catch (error) {
      token = null;
    }
  }

  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
  });

  return instance;
};

// Request options interface
export interface ApiRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

// ---------------- HTTP Methods ----------------

const httpGet = async (endpoint: string, options?: ApiRequestOptions) => {
  const instance = await axiosInstance();
  const response = await instance.get(endpoint, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

const httpPost = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
  const instance = await axiosInstance();
  const response = await instance.post(endpoint, data, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

const httpPut = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
  const instance = await axiosInstance();
  const response = await instance.put(endpoint, data, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

const httpPatch = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
  const instance = await axiosInstance();
  const response = await instance.patch(endpoint, data, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

const httpDelete = async (endpoint: string, options?: ApiRequestOptions) => {
  const instance = await axiosInstance();
  const response = await instance.delete(endpoint, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

// Export httpClient
export const httpClient = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
};