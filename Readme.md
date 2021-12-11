# Lib for nuag.e provider
It's a simple lib in Typescript for dealing with nuag.e provider ( VPS)

----------------

TODO :
* set Authentification
* create a server
* get information of server
* start/stop a server
* delete a server

----------------

# using require
const { getWorkspaceNuage, createServer, getIpServer, CORE, RAM, DISK  } = require('nuage-lib');

how to use lib :

Using promise to connect to your workspace
```javascript

//return a boolean
getWorkspaceNuage({
  account_name, // user to login
  account_pass, // user's password
  account_org // name of your organization
}).then((res) => if(res) console.log("ok"));
 ```

 Using promise to create a Server
 async function createServer(projectName:string,ram:number, core:number, diskSize:number, osName:string, description:string, name:string, enablePublicIP:boolean=true, allowSSH:boolean=true, allowHTTP:boolean=true):Promise<string>{

```javascript

//return the id of new server
createServer({
  projectName, // name of your workspace to create server
  ram, // use enum RAM
  core, // use enum CORE
  diskSize, // use enum DISK
  osName, // use enum OS_NAME
  description, // description of your server
  name, // name of your server
  enablePublicIP, // by default yes, attach a pulic IP
  allowSSH, // by default yes, open SSH port
  allowHTTP, // by default yes, open 80/443 ports

}).then((res) => console.log("res"));
 ```

 Using promise to get public IP of one server
```javascript

//return the public ip of your server
getWorkspaceNuage({
  project_name, // the name of your workspace 
  serverid // id of the server
}).then((ip) => console.log(ip));
 ```


