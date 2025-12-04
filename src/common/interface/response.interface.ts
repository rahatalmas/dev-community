//response model for seccessful execution
export class ResponseInterface{
    status:string
    message:string
    data?:any
    accessToken?:string
    constructor({message,data,accessToken}:{message:string,data?:any,accessToken?:string}){
        this.status = "success",
        this.message = message,
        this.data = data
        this.accessToken = accessToken
    }
}