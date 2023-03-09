import httpClient from "../httpClient";

class StoreService{
    async getAll(){
        try {
            // if(userId) return await httpClient.get(`/users/${userId}/stores`);
            return await httpClient.get(`/stores`);
        }catch (e){
            return e.message;
        }
    }
    async get(storeId){
        try {
            return await httpClient.get(`/stores/${storeId}`);
        }catch (e){
            return e.message;
        }
    }
    async create(data){
        try {
            return await httpClient.post(`/stores`,data);
        }catch (e){
            return e.message;
        }
    }
    async update(storeId, data){
        try {
            return await httpClient.put(`/stores/${storeId}`,data);
        }catch (e){
            return e.message;
        }
    }
    async delete(storeId){
        try {
            return await httpClient.delete(`/stores/${storeId}`);
        }catch (e){
            return e.message;
        }
    }
}

export default new StoreService();