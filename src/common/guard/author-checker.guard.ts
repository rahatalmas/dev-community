import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthorChecker implements CanActivate{
    //constructor()
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let req = context.switchToHttp().getRequest()
        console.log("guard- auth cheker")
        console.log("checking user id: ",req["user"])
        return true
    }
}