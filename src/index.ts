import * as dotenv from "dotenv";
import { AuthParams, KeyPairParams, ProjectParams} from './models/arya';
import { ServerParams, FlavorParams, ImageParams, SecurityParams} from './models/rockefeller';
import { Token } from './api/token';
import { Auth } from './api/auth';
import { AryaEndpoint } from './api/arya';
import { RockefellerEndpoint } from './api/rockefeller';

enum CORE {
    _1 = 1,
    _2 = 2,
    _4 = 4,
    _8 = 8,
    _16 = 16,
    _32 = 32,

};

enum RAM {
    _1 = 1,
    _2 = 2,
    _4 = 4,
    _8 = 8,
    _16 = 16,
    _32 = 32,
    _64 = 64,
    _128 = 128,
    _240 = 240,

};

enum DISK{
    _100 = 100
}

enum OS_NAME{
    UBUNTU20_04="20.04 LTS (Focal Fossa)",
}

dotenv.config();

let token:Token=new Token("");

let myAryaEndpoint:AryaEndpoint;   
let allKey:KeyPairParams[]|any;  
let allProject:ProjectParams[];   

let myRockefellerEndpoint:RockefellerEndpoint;  
let allFlavors:FlavorParams[];    
let allImages:ImageParams[];     
let allSecurity:SecurityParams[];
let allServers:ServerParams[];


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getWorkspaceNuage(nameAccount:string, passwordAccount:string, organizationAccount:string):Promise<boolean>
{
    let auth:AuthParams={
        name:nameAccount,
        password:passwordAccount,
        organization:organizationAccount
    };

    //create user auth and store token
    const makeAuth:Auth=new Auth();
    const response=await makeAuth.doAUth(auth);

     if(response!="" && response.search("error")===-1) 
        token=new Token(response);  
     else
        return false;
 
    myAryaEndpoint=new AryaEndpoint(token);    
    allKey=await myAryaEndpoint.listKeyPair();  
    allProject=await myAryaEndpoint.listProject();     

    myRockefellerEndpoint=new RockefellerEndpoint(token);    
    allFlavors= await myRockefellerEndpoint.listFlavors();    
    allImages= await myRockefellerEndpoint.listImages();     
    allSecurity= await myRockefellerEndpoint.listSecurity();


    return true;
    
}

async function createServer(projectName:string,ram:number, core:number, diskSize:number, osName:string, description:string, name:string, enablePublicIP:boolean=true, allowSSH:boolean=true, allowHTTP:boolean=true):Promise<string>{

    let securityGrps:string[]=[];
    let firstKeyPair:string ="";
    let currentProject:string|undefined="";
    let idFlavor:string|undefined="";
    let idImage:string|undefined="";
    let idSecurity:string|undefined="";


    firstKeyPair=allKey[0].id;   
    
    currentProject=allProject.find(aProject => aProject.description === projectName)?.id

    if(currentProject!=null && currentProject ==="")
        return "Project Name Workspace not found";


    idFlavor=allFlavors.find(aFlavor => aFlavor.ram === ram && aFlavor.core === core && aFlavor.disk === diskSize)?.id

    if(idFlavor!=null && idFlavor ==="")
        return "Machine configuration is invalid !!";


    idImage=allImages.find(aImage => aImage.osVersion === osName)?.id;

    if(idImage!=null && idImage ==="")
        return "Image base not found";

    
    if(allowSSH)
    {
        idSecurity=allSecurity.find(aSecurity => aSecurity.name === "ssh")?.id;   

        if(idSecurity!=null && idSecurity ==="")
            return "Security type not found";

        securityGrps[0]="/rockefeller/security_groups/"+idSecurity;
    }

    if(allowHTTP)
    {
        idSecurity=allSecurity.find(aSecurity => aSecurity.name === "web")?.id;   
 
        if(idSecurity!=null && idSecurity ==="")
            return "Security type not found";

        if(allowSSH)
            securityGrps[1]="/rockefeller/security_groups/"+idSecurity;
        else
            securityGrps[0]="/rockefeller/security_groups/"+idSecurity;
    }

    let paramsVM= {"description":description,
                "flavor":"/rockefeller/flavors/"+idFlavor,
                "image":"/rockefeller/images/"+idImage,
                "ips":[],
                "keypair":firstKeyPair,
                "name":name,
                "project":"/arya/projects/"+currentProject,
                "securityGroups":securityGrps}

    let responsecreate=await myRockefellerEndpoint.createServer(paramsVM);

    if(enablePublicIP)
        await myRockefellerEndpoint.associatePublicIp({"addressFamily":"ipv4","server":"/rockefeller/servers/"+responsecreate.id,"type":"public"})      
     

    return responsecreate.id;
}

async function getIpServer(projectName:string, idServer:string):Promise<string>{

    let currentProject:string|undefined="";
    let serverToReturn;

    currentProject=allProject.find(aProject => aProject.description === projectName)?.id

    if (currentProject==null || currentProject==undefined)
        return "Project Name doesn't exist !"
    
    allServers=await myRockefellerEndpoint.getAllServerFromProject(currentProject);
    serverToReturn=allServers.find(aServer => aServer.id === idServer);

    if(serverToReturn==null || serverToReturn==undefined)
        return "IdServer doesn't exist !" 
    
    return JSON.parse(JSON.stringify(serverToReturn.ips[1])).address;

}

//For debug purpose
/*getWorkspaceNuage(
    process.env.ACCOUNT_NAME as string, process.env.ACCOUNT_PASS as string, process.env.ACCOUNT_ORG as string).then((res) => {        
        if(res) 
            createServer("test", CORE._4, RAM._4, DISK._100, OS_NAME.UBUNTU20_04, "mahcinetest", "mahcinetest", true, true, true)
            .then(async (res) => {console.log(res), await sleep(2000), getIpServer("test",res).then((res) => console.log(res)) });
    });
*/
module.exports = { getWorkspaceNuage, createServer, getIpServer, CORE, RAM, DISK  };




