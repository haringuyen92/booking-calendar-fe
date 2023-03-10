import httpClient from "@/httpClient";

class SettingTimeService{
    get(storeId){
        return httpClient.get(`/stores/${storeId}/settingTime`);
    }
    update(storeId, data){
        return httpClient.post(`/stores/${storeId}/settingTime`, data);
    }
}

export default new SettingTimeService();