import { 
    ObjectId, UpdateResult, DeleteResult, InsertOneResult, InsertManyResult, Document 
} from "mongodb";

import { 
    BadRequestException, 
    NotFoundException, 
    InternalServerErrorException 
} from "@nestjs/common";

//method for validating a id is valid mongodb id or not
export function MongoIdValidator(id: string){
    if(!ObjectId.isValid(id)){
        throw new BadRequestException("invalid id param")
    }else{
        return new ObjectId(id)
    }
}

//method mongo db query result validation...
export function MongoQueryResultValidator(
    res: 
        | UpdateResult<Document>
        | DeleteResult
        | InsertOneResult<Document>
        | InsertManyResult<Document>
        | Document
        | Document[],
    operation: 
        | "insertOne"
        | "insertMany"
        | "updateOne"
        | "updateMany"
        | "replaceOne"
        | "deleteOne"
        | "deleteMany"
        | "findOne"
        | "findMany"
        | "find"
        | "aggregate"
) {
    switch (operation) {

        // INSERT
        case "insertOne":
            if (!("acknowledged" in res) || !(res as InsertOneResult<Document>).insertedId) {
                throw new InternalServerErrorException("InsertOne operation failed");
            }
            break;

        case "insertMany":
            if (!("acknowledged" in res) || Object.keys((res as InsertManyResult<Document>).insertedIds).length === 0) {
                throw new InternalServerErrorException("InsertMany operation failed");
            }
            break;

        // UPDATE
        case "updateOne":
        case "updateMany":
        case "replaceOne":
            if (!("matchedCount" in res) || (res as UpdateResult).matchedCount === 0) {
                throw new NotFoundException("No document matched for update");
            }
            break;

        // DELETE
        case "deleteOne":
        case "deleteMany":
            if (!("deletedCount" in res) || (res as DeleteResult).deletedCount === 0) {
                throw new NotFoundException("No document deleted");
            }
            break;

        // FIND
        case "findOne":
            if (!res) {
                throw new NotFoundException("Document not found");
            }
            break;

        case "findMany":
        case "find":
            if (!Array.isArray(res) || res.length === 0) {
                throw new NotFoundException("No documents found");
            }
            break;

        // AGGREGATION
        case "aggregate":
            if (!Array.isArray(res) || res.length === 0) {
                throw new NotFoundException("Aggregation returned no documents");
            }
            break;

        default:
            throw new BadRequestException("Unknown MongoDB operation type");
    }
    return res;
}


