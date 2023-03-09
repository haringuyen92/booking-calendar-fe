import httpClient from "@/httpClient";

class SettingSlotService{
    update(storeId, setting){
        try {
            const acceptData = ['isRequiredStaff', 'isUseCostStaff', 'isRequiredCourse', 'isUseCostCourse', 'defaultCourseEstimationTime']
            for (let key in setting){
                if(!acceptData.includes(key)) delete setting[key];
            }
            return httpClient.post(`/stores/${storeId}/settingSlot`,setting);
        }catch (e){
            return e.message;
        }
    }
}
export default new SettingSlotService();