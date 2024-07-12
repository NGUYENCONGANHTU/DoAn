import { APIService } from "../api.service";
import { URL_API } from "@/constants/env";

export class OrderService extends APIService {
  constructor() {
    super(URL_API);
  }

  async getOrders(url) {
    return this.get(`${url}`)
      .then((response) => response?.data.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getOrder(url) {
    return this.get(`${url}`)
      .then((response) => response?.data.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async updateOrder(url, data) {
    return this.put(`${url}`, data)
      .then((response) => response?.data.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
