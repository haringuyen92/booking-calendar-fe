import httpClient from "../httpClient";

class StoreService{
    async getAll(){
        try {
            return await httpClient.get('/stores');
        }catch (e){
            new Error(e);
        }
    }
}

export default new StoreService();