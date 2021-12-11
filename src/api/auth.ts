import { requests} from './api';
import { AuthParams} from '../models/arya';
import axios from 'axios';

const URL_AUTH="/arya/auth";

export class Auth{
  
    constructor(){      
    }

    public async doAUth (params:AuthParams):Promise<string>{
        try{
            const response =await requests.post(URL_AUTH,params);      
            return response.token;
        }catch (error) {
            if (axios.isAxiosError(error)) {
              const serverError = error;             
              if (serverError && serverError.response) {
                return "error :"+serverError.response.data.message ;
              }
            }
            return "";
        }
    }

}