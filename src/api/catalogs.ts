import { requests, myToken} from './api';
import axios from 'axios';
import { Token } from './token';
import { ItemCatalog} from '../models/catalogs';

const URL_ITEMS="/catalog/items";

export class CatalogsEndpoint{   
  
    constructor(aToken:Token){   
        myToken.token=aToken.token;       
    }

    public async listItem ():Promise<any>{
        try{           
            const response =await requests.get(URL_ITEMS);    
            console.log(response);
            return "";
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