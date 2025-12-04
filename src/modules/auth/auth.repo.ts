import { Inject, Injectable } from "@nestjs/common";
import { Db, ObjectId } from "mongodb";
import { RegistrationDto } from "./dto/register.dto";

@Injectable()
export class AuthRepo{
    collection:string = "users"
    constructor(@Inject("MONGO_DB") private readonly db:Db){}
    
    //this method implements query for getting a user using a email
    //used in login() method of auth service
    async findByEmail(email: string){
        let res = await this.db.collection(this.collection).findOne(
            {email:email}
        )
        return res
    }

    //this method implements query for saving information about new user
    //used in register() method of auth service  
    async create(data: RegistrationDto){
        let res = await this.db.collection(this.collection).insertOne({
            ...data
        })
        return res
    }

}