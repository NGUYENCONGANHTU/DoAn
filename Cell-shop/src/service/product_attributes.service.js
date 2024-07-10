import { APIService } from "./api.service";
import { URL_API } from "@/constants/env";

export class ProductAttributeService extends APIService {

    constructor() {
        super(URL_API)
    }
    
    async getProductAttributes(url) {
        return this.get(`${url}`)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async getProductAttribute(url, id) {
        return this.get(`${url}/${id}`)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async createProductAttribute(url, data) {
        return this.post(`${url}`,data)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async updateProductAttribute(url,data) {
        return this.put(`${url}`,data)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async deleteProductAttribute(url) {
        return this.delete(`${url}`)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }
}