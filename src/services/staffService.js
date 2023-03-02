import httpClient from "@/httpClient";

class StaffService{
    getAll(storeId = ''){
        return httpClient.get(`${storeId}`);
    }
}
module.exports = new StaffService();