import { API_CONFIG, ApiError } from '@/lib/api-config';

interface ApiResponse<T> {
  items: T[];
  total?: number;
  page?: number;
  limit?: number;
}

export class BaseCrudService {
  private static async fetchApi<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/${endpoint}`, {
        headers: {
          ...API_CONFIG.HEADERS,
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          response.status,
          errorData.error || response.statusText,
          errorData
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async getAll<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.fetchApi<ApiResponse<T>>(endpoint);
  }

  static async getById<T>(endpoint: string, id: string): Promise<T> {
    return this.fetchApi<T>(`${endpoint}/${id}`);
  }

  static async create<T>(endpoint: string, data: Partial<T>): Promise<T> {
    return this.fetchApi<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async update<T>(endpoint: string, id: string, data: Partial<T>): Promise<T> {
    return this.fetchApi<T>(`${endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async delete(endpoint: string, id: string): Promise<void> {
    return this.fetchApi<void>(`${endpoint}/${id}`, {
      method: 'DELETE',
    });
  }
}
