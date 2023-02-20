import httpClient from "../httpClient";

class StoreService{
    async getAll(){
        return await httpClient.get('/stores');
    }
}

export default new StoreService();