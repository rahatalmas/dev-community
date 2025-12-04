import { ObjectId } from "mongodb"
import { MetaDataDto } from "../../../common/meta-dat.dto"
import { CreateBlogDto } from "../dto/create-blog.dto"

export class Blog extends MetaDataDto{
    title: string
    authorId: string
    status: string
    content: string
    summary: string 
    metaTitle: string 
    metaDescription: string
    tags: string[]
    commentsCount:number
    likesCount:number
    
    constructor(data: CreateBlogDto){
        super()
        this.title = data.title;
        this.authorId = data.authorId;
        this.status = data.status
        this.content = data.content;
        this.summary = this.content?.slice(0, 25) || "";
        this.tags = data.tags
        this.metaTitle = "seo meta title";
        this.metaDescription = "seo description";
        this.commentsCount=0
        this.likesCount=0
    }
}
