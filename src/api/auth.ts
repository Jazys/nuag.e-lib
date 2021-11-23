import { requests} from './api';
import { AuthParams} from '../models/arya';
import axios from 'axios';

const URL_AUTH="/arya/auth";

export class Auth{
  
    constructor(){      
    }

    public async doAUth (params:AuthParams):Promise<{isOk:boolean, value:string}>{
        try{
            const response =await requests.post(URL_AUTH,params);      
            return {isOk:true,value:response.token};
        }catch (error) {
            if (axios.isAxiosError(error)) {
              const serverError = error;             
              if (serverError && serverError.response) {
                return {isOk:false,value:serverError.response.data.message as string};
              }
            }
            return {isOk:false, value:""};
        }
    }

}