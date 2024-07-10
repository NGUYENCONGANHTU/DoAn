import { APIService } from "./api.service";
import { URL_API } from "@/constants/env";

export class CategoryService extends APIService {

    constructor() {
        super(URL_API)
    }
    
    async getCategories(url) {
        return this.get(`${url}`)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async getCategory(url, id) {
        return this.get(`${url}/${id}`)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async createCategory(url, data) {
        return this.post(`${url}`,data)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async updateCategory(url, data) {
        return this.put(`${url}`,data)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async deleteCategory(url) {
        return this.delete(`${url}`)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }
}