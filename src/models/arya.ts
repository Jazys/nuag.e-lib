export interface AuthParams{
    name:string;
    password: string;
    organization?: string;
}

export interface KeyPairParams {
    id:string;
    name:string;
    description:string;
    publicKey:string;
    isDefault:boolean;
    createdAt:string;
    sha256:string;
    md5:string;
}

export interface ProjectParams{
    id:string;
    driverType:string;
    name:string;
    description:string;
    createdAt:string;
}



