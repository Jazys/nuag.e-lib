export interface ServerParams {
    name:string;
    project:string;
    description:string;
    flavor: string;
    image: string;
    ips?:string[];
    keyPair:string;
    securityGroups?:string[];
}