import httpClient from "../httpClient";

class StoreService{
    async getAll(){
        try {
            return await httpClient.get('/stores');
        }catch (e){
            new Error(e);
        }
    }
    async create(data){
        try {
            return await httpClient.post('/stores',{data});
        }catch (e){
            new Error(e);
        }
    }
}

export default new StoreService();