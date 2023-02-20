import httpClient from "../httpClient";

class StoreService{
    async getAll(){
        try {
            return await httpClient.get('/users/stores');
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