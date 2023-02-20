import httpClient from "../httpClient";

class AuthService{
    async login(email, password){
        console.log("start login");
        try{
            return await httpClient.post('/auth/login', {email, password});
        }catch(err){
            console.log(err);
        }
    }
    async register(name, email, password){
        console.log("start register");
        try{
            return await httpClient.post('/auth/register', {name, email, password})
        }catch(err){
            console.log(err);
        }
    }
}
export default new AuthService();
 

