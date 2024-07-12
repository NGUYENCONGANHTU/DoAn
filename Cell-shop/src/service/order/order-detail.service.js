import { APIService } from "../api.service";
import { URL_API } from "@/constants/env";

export class OrderDetailService extends APIService {
  constructor() {
    super(URL_API);
  }

  async getOrderDetails(url) {
    return this.get(`${url}`)
      .then((response) => response?.data.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
