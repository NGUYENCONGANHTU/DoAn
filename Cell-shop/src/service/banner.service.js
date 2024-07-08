import { APIService } from "./api.service";
import { URL_API } from "@/constants/env";

export class BannerService extends APIService {

    constructor() {
        super(URL_API)
    }
    
    async getBanners(url) {
        return this.get(`${url}`)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async getBanner(url, id) {
        return this.get(`${url}/${id}`)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async createBanner(url, data) {
        return this.post(`${url}`,data)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async updateBanner(url, id, data) {
        return this.put(`${url}/${id}`,data)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async deleteBanner(url, id) {
        return this.delete(`${url}/${id}`)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }
}