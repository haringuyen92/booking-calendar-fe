import httpClient from "../httpClient";

class StoreService{
    async getAll(userId = ''){
        try {
            if(userId) return await httpClient.get(`/users/${userId}/stores`);
            return await httpClient.get(`/stores`);
        }catch (e){
            return e.message;
        }
    }
    async create(userId, data){
        try {
            return await httpClient.post(`/users/${userId}/stores`,data);
        }catch (e){
            return e.message;
        }
    }
}

export default new StoreService();