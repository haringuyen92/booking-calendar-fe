import httpClient from "@/httpClient";

class CourseService{
    getAll(storeId){
        try {
            return httpClient.get(`/stores/${storeId}/course`);
        }catch (e){
            return e.message;
        }
    }
    get(storeId, id){
        try {
            return httpClient.get(`/stores/${storeId}/course/${id}`);
        }catch (e){
            return e.message;
        }
    }
    create(storeId, staff){
        try {
            const acceptData = ['name', 'image', 'description', 'cost', 'estimationTime']
            for (let key in staff){
                if(!acceptData.includes(key)) delete staff[key];
            }
            return httpClient.post(`/stores/${storeId}/course`,staff);
        }catch (e){
            return e.message;
        }
    }
    update(storeId, staffId, staff){
        try {
            const acceptData = ['name', 'image', 'description', 'cost', 'estimationTime']
            for (let key in staff){
                if(!acceptData.includes(key)) delete staff[key];
            }
            return httpClient.put(`/stores/${storeId}/course/${staffId}`,staff);
        }catch (e){
            return e.message;
        }
    }
    delete(storeId, staffId){
        try {
            return httpClient.delete(`/stores/${storeId}/course/${staffId}`);
        }catch (e){
            return e.message;
        }
    }
}
export default new CourseService();