import * as dotenv from "dotenv";
import { AuthParams} from './models/arya';
import { Token } from './api/token';
import { Auth } from './api/auth';

dotenv.config();

let auth:AuthParams={
    name:process.env.ACCOUNT_NAME as string,
    password:process.env.ACCOUNT_PASS as string,
    organization:process.env.ACCOUNT_ORG
};

var token:Token=new Token("");

 console.log(auth);

async function doAuth(){
    const makeAuth:Auth=new Auth();
    const response=await makeAuth.doAUth(auth);
    if(response.isOk)
        token.token=response.value
    else
        console.log(response.value);

    console.log(token);
}

doAuth();


