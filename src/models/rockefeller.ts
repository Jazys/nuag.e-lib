export interface ServerParams {
    id?:string;
    name:string;
    project:string;
    description:string;
    flavor: string;
    image: string;
    ips:string[];
    keypair:string;
    securityGroups?:string[];
    status?:string;
    state?:any;
}

export interface ReponseCreateServer{
  id:string;
  name:string;
  project:string;
  description:string;
  flavor: string;
  image: string;
  ips?:string[];
  securityGroups?:string[];
  createdAt:string;
  status:string;
  state:any;
}

export interface FlavorParams{
    id:string;
    name:string;
    ram:number;
    core:number;
    disk:number;
    isPublic:boolean;
}

export interface ImageParams{
    id:string;
    name:string;
    description:string;
    osAdminUser:string;
    isPublic:boolean;
    isDefault:boolean;
    createdAt:string;
    updatedAt:string;
    osName:string;
    osVersion:string;
    osReleasedAt:string;
}

export interface SecurityParams{
    id:string;
    name:string;
    description:string;
}

export interface IpInterface
{
  addressFamily:string;
  server:string;
  type:string;
}