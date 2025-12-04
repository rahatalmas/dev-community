import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

//global interceptor for modifying all the responses befor sent to client
@Injectable()
export class ResponseInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext,next: CallHandler): Observable<any>{
        return next.handle().pipe(
            map(data=>{
                return data
            })
        )
    }
}