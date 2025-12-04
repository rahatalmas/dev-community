import { ObjectId } from "mongodb"
//meta data for entities
export class MetaDataDto{
    created_at: string
    updated_at: string
    constructor(){
        this.created_at = Date.now().toString()
        this.updated_at = Date.now().toString()
    }
    cleanUndefined(obj: any) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== undefined)
    );
}

}