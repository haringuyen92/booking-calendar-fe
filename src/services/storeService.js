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
    async get(userId = '', storeId){
        try {
            return await httpClient.get(`/users/${userId}/stores/${storeId}`);
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
    async update(userId, storeId, data){
        try {
            return await httpClient.put(`/users/${userId}/stores/${storeId}`,data);
        }catch (e){
            return e.message;
        }
    }
    async delete(userId, storeId){
        try {
            return await httpClient.delete(`/users/${userId}/stores/${storeId}`);
        }catch (e){
            return e.message;
        }
    }
}

export default new StoreService();