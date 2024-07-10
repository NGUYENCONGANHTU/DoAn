import { APIService } from "./api.service";
import { URL_API } from "@/constants/env";

export class ContactsService extends APIService {
  constructor() {
    super(URL_API);
  }

  async getContact(url) {
    return this.get(`${url}`)
      .then((response) => response?.data.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async contactDetail(url, id) {
    return this.get(`${url}/${id}`)
      .then((response) => response?.data.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async createContact(url, data) {
    console.log(data);
    return this.post(`${url}`, data)
      .then((response) => response?.data.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async updateContact(url, data) {
    return this.put(`${url}`, data)
      .then((response) => response?.data.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteContact(url) {
    return this.delete(`${url}`)
      .then((response) => response?.data.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
