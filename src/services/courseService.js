import httpClient from "@/httpClient";

class CourseService{
    getAll(storeId){
        try {
            return httpClient.get(`/stores/${storeId}/courses`);
        }catch (e){
            return e.message;
        }
    }
    get(storeId, id){
        try {
            return httpClient.get(`/stores/${storeId}/courses/${id}`);
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
            return httpClient.post(`/stores/${storeId}/courses`,staff);
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
            return httpClient.put(`/stores/${storeId}/courses/${staffId}`,staff);
        }catch (e){
            return e.message;
        }
    }
    delete(storeId, staffId){
        try {
            return httpClient.delete(`/stores/${storeId}/courses/${staffId}`);
        }catch (e){
            return e.message;
        }
    }
}
export default new CourseService();