import axios, { type AxiosInstance } from 'axios';
import type { Rally } from "../types/Rally.interface";

class RallyAPIService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000/api'
    });
  }

  async getRalliesWithinBounds(bounds: Array<number[]>): Promise<[unknown, Rally[]]> {
    try {
      let { data } = await this.axiosInstance.request<Rally[]>({
        method: 'post',
        url: '/search',
        data: bounds,
        headers: {
          'X-HTTP-Method-Override': 'GET'
        }
      });
      return [null, data];
    } catch (error) {
      return [error, []];
    }

  }

  async saveRally(rally: any): Promise<[unknown, Rally | null]> {
    try {
      let { data } = await this.axiosInstance.request<Rally>({
        method: 'post',
        url: '/rally',
        data: rally,
      });
      return [null, data];
    } catch (error) {
      return [error, null];
    }

  }
}

export const rallyAPI = new RallyAPIService();