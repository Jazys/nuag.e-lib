import { requests, myToken} from './api';
import { KeyPairParams, ProjectParams} from '../models/arya';
import axios from 'axios';
import { Token } from './token';

const URL_KEYPAIR="/arya/keypairs";
const URL_PROJECTS="/arya/projects"

export class AryaEndpoint{   
  
    constructor(aToken:Token){   
        myToken.token=aToken.token;       
    }

    public async listKeyPair ():Promise<KeyPairParams|any>{
        try{           
          
            const response =await requests.get(URL_KEYPAIR);  
            let retKeyPair:KeyPairParams [] =[...response["hydra:member"]]          
            return retKeyPair;
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

    public async listProject ():Promise<ProjectParams[]|any>{
        try{           
            const response =await requests.get(URL_PROJECTS);  
            let retAllProject:ProjectParams [] =[...response["hydra:member"]]     
            return retAllProject;
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