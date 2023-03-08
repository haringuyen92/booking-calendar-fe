import httpClient from "@/httpClient";

class StaffService{
    getAll(storeId){
        try {
            return httpClient.get(`/stores/${storeId}/staffs`);
        }catch (e){
            return e.message;
        }
    }
    get(storeId, id){
        try {
            return httpClient.get(`/stores/${storeId}/staffs/${id}`);
        }catch (e){
            return e.message;
        }
    }
    create(storeId, staff){
        try {
            const acceptData = ['name', 'image', 'description', 'cost', 'maxBookingSlot']
            for (let key in staff){
                if(!acceptData.includes(key)) delete staff[key];
            }
            return httpClient.post(`/stores/${storeId}/staffs`,staff);
        }catch (e){
            return e.message;
        }
    }
    update(storeId, staffId, staff){
        try {
            const acceptData = ['name', 'image', 'description', 'cost', 'maxBookingSlot', 'isAllCourse', 'courses']
            for (let key in staff){
                if(!acceptData.includes(key)) delete staff[key];
            }
            return httpClient.put(`/stores/${storeId}/staffs/${staffId}`,staff);
        }catch (e){
            return e.message;
        }
    }
    delete(storeId, staffId){
        try {
            return httpClient.delete(`/stores/${storeId}/staffs/${staffId}`);
        }catch (e){
            return e.message;
        }
    }
}
export default new StaffService();