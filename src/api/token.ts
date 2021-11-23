export class Token{
    private _token:string;

    constructor(val:string){
        this._token=val;
    }

    public get token():string{
        return this._token;
    }

    public set token(token:string){
        this._token=token;
    }
}