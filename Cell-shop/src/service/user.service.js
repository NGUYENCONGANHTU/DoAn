import { APIService } from "./api.service";
import { URL_API } from "@/constants/env";

export class UserService extends APIService {
  constructor() {
    super(URL_API);
  }

  async getUsers(url) {
    return this.get(`${url}`)
      .then((response) => response?.data.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getUser(url) {
    return this.get(`${url}`)
      .then((response) => response?.data.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async updateUser(url, data) {
    return this.put(`${url}`, data)
      .then((response) => response?.data.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
