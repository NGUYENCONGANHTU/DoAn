import { APIService } from "./api.service";
import { URL_API } from "@/constants/env";

export class AuthService extends APIService {

    constructor() {
        super(URL_API)
    }
    
    async loginAdmin(url,data) {
        return this.post(`${url}`,data)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }

    async logoutAdmin(url) {
        return this.get(url)
        .then((response) => response?.data.data)
        .catch((error) => {
            throw error?.response?.data;
        });
    }
}