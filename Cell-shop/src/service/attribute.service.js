import { APIService } from "./api.service";
import { URL_API } from "@/constants/env";

export class AttributeService extends APIService {

    constructor() {
        super(URL_API)
    }
    
    async getAttributes(url) {
        return this.get(`${url}`)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async getAttribute(url, id) {
        return this.get(`${url}/${id}`)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async createAttribute(url, data) {
        return this.post(`${url}`,data)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async updateAttribute(url, data) {
        return this.put(`${url}`,data)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async deleteAttribute(url) {
        return this.delete(`${url}`)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }
}