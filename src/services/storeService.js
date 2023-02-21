import httpClient from "../httpClient";

class StoreService{
    async getAll(userId = ''){
        try {
            if(userId) return await httpClient.get(`/users/${userId}/stores`);
            return await httpClient.get(`/stores`);
        }catch (e){
            new Error(e);
        }
    }
    async create(userId, data){
        try {
            return await httpClient.post(`/users/${userId}/stores`,data);
        }catch (e){
            new Error(e);
        }
    }
}

export default new StoreService();