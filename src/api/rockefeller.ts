import { requests, myToken} from './api';
import axios from 'axios';
import { Token } from './token';
import { ServerParams, FlavorParams, ImageParams, SecurityParams, IpInterface} from '../models/rockefeller';

const URL_FLAVORS="/rockefeller/flavors";
const URL_IMAGES="/rockefeller/images"
const URL_SECURITYGROUPS="/rockefeller/security_groups";
const URL_SERVER="/rockefeller/servers";
const URL_IPS="/rockefeller/ips"; 

export class RockefellerEndpoint{   
     
    constructor(aToken:Token){   
        myToken.token=aToken.token;       
    }

    public async listFlavors ():Promise<FlavorParams|any>{
        try{           
            const response =await requests.get(URL_FLAVORS);    
            let retAllFlavor:FlavorParams[] =[...response["hydra:member"]]     
            return retAllFlavor;
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
    
    public async listImages ():Promise<ImageParams[]|any>{
        try{           
            const response =await requests.get(URL_IMAGES);    
            let retAllImages:ImageParams[] =[...response["hydra:member"]];     
            return retAllImages;
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
    
    public async listSecurity ():Promise<SecurityParams[]|any>{
        try{           
            const response =await requests.get(URL_SECURITYGROUPS);  
            let retAllSecurity:SecurityParams [] =[...response["hydra:member"]]     
            return retAllSecurity;    
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

    public async getAllServerFromProject (projectId:string):Promise<ServerParams[]|any>{
        try{           
            const response =await requests.get(URL_SERVER+"?project="+projectId);  
            let retAllServers:ServerParams [] =[...response["hydra:member"]]     
            return retAllServers;
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

    public async createServer (paramsCreate:ServerParams):Promise<object|any>{
        try{           
            const response =await requests.post(URL_SERVER,paramsCreate);              
            return response;
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

    public async associatePublicIp (params:IpInterface):Promise<any>{
        try{  
            const response =await requests.post(URL_IPS,params);              
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