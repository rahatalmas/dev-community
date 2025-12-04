import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

//global guard for testing
export class AppGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log("App guard activated")
        return true;
    }
}