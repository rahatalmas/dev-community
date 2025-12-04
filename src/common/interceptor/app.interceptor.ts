import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable,tap } from "rxjs";

//global interceptor for testing and login req data
export class AppInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        let req = context.switchToHttp().getRequest();
        console.log("Req Data: ",req.body)
        console.log("request processing...")
        return next.handle().pipe(
            tap(()=>{
               console.log("after processing...")
            })
        );
    }
}