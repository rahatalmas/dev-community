import { Injectable,Inject,BadRequestException } from "@nestjs/common";
import { Db } from "mongodb";
import { Blog } from "./entities/blog.entity";
import { UpdateBlogDto } from "./dto/update-blog.dto";
import { MongoIdValidator } from "../../common/utils/mongo.util";
import { DeleteBlogDto } from "./dto/delete-blog-dto";

@Injectable()
export class BlogRepository{
    private readonly collection="blogs";
    constructor(@Inject("MONGO_DB") private readonly db:Db){}
    
    //this method implements query for saving a blog to the collection
    //used in create() method in service
    async save(blog: Blog){
       //need to implement logics to check user exists with the id or not..
       let authorId = blog.authorId;
       let check = await this.db.collection("users").findOne({_id:MongoIdValidator(authorId)})
       if(check == null){
        throw new BadRequestException("invalid user id")
       }
       let res = await this.db.collection(this.collection).insertOne(blog)
       return res
    }

    async saveWithAuthorSubset(){
       console.log("for testing, maybe implement later if necessary...")
    }
    
    //this method implements query for returning list of blogs
    async findAll() {
        return "all blogs"
    }
     
    //this method implements query for returning list of blogs with author information
    //used in findAll() method in service
    async findAllWithRefs() {
      const blogs = await this.db.collection(this.collection).aggregate([
      {
        $lookup: {
          from: "users",
          let: { authorId: "$authorId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [
                    "$_id",
                    {
                      $cond: [
                        { $eq: [{ $type: "$$authorId" }, "string"] },
                        { $toObjectId: "$$authorId" },
                        "$$authorId"
                      ]
                    }
                  ]
                }
              }
            },
            { $project: { fullname: 1, username: 1, dp_uri: 1 } }
          ],
          as: "author"
        }
      },
      { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          status: 1,
          title: 1,
          content: 1,
          summary: 1,
          tags: 1,
          likesCount: 1,
          commentsCount: 1,
          "author.fullname": 1,
          "author.username": 1,
          "author.dpUri": 1,
        }
      }
    ])
    .toArray();

            return blogs;
    }
    //this method implements query for returning specific blogs with author information
    //used in findOne() method in service
  async findByIdWithAuthor(id: string) {
    const bId = MongoIdValidator(id);

    const res = await this.db
      .collection(this.collection)
      .aggregate([
        { $match: { _id: bId } },
        {
          $lookup: {
            from: "users",
            let: { authorId: "$authorId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: [
                      "$_id",
                      {
                        $cond: [
                          { $eq: [{ $type: "$$authorId" }, "string"] },
                          { $toObjectId: "$$authorId" },
                          "$$authorId"
                        ]
                      }
                    ]
                  }
                }
              },
              { $project: { fullname: 1, username: 1, dpUri: 1 } }
            ],
            as: "author"
          }
        },
        { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "comments",
            let: { blogId: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$blogId", { $toString: "$$blogId" }] } } },
              {
                $lookup: {
                  from: "users",
                  let: { uid: "$userId" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", { $toObjectId: "$$uid" }]
                        }
                      }
                    },
                    { $project: { fullname: 1, username: 1, dpUri: 1 } }
                  ],
                  as: "user"
                }
              },
              { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } }
            ],
            as: "comments"
          }
        },

        // Add comment count dynamically
        //{ $addFields: { commentsCount: { $size: "$comments" } } },

        // Project necessary fields
        {
          $project: {
            status: 1,
            title: 1,
            content: 1,
            summary: 1,
            tags: 1,
            likesCount: 1,
            commentsCount: 1,
            "author.fullname": 1,
            "author.username": 1,
            "author.dpUri": 1,
            "comments._id": 1,
            "comments.comment": 1,
            "comments.replyCount":1,
            "comments.userId": 1,
            "comments.user.fullname": 1,
            "comments.user.username": 1,
            "comments.user.dpUri": 1
          }
        }
      ])
      .toArray();

    return res;
  }

  //this method implements query for removing a blog
  //used in remove() method in service
  async removeBlog(deleteBlogDto: DeleteBlogDto){
      let bId = MongoIdValidator(deleteBlogDto.blogId)
      let uId = MongoIdValidator(deleteBlogDto.authorId)
      let res = await this.db.collection(this.collection).deleteOne(
          {
              $and:[
                  {_id:bId},{author_id:uId}
              ]
          }
      )
      return res
  }
  
  //this method implements query for returning a specific blog
  async findById(id: string){
      let bId = MongoIdValidator(id)
      let res = await this.db.collection(this.collection).findOne({
          _id:bId
      })
      return res
  }

  //this method implements query for updating a blog
  //used in update() method in service
  async updateBlog(updateBlogDto: UpdateBlogDto){
      let bId = MongoIdValidator(updateBlogDto.blogId)
      let uId = MongoIdValidator(updateBlogDto.authorId)
      let res = await this.db.collection(this.collection).updateOne(
          {
              and$:[
                  {_id:bId},{author_id:uId}
              ]
          },
          {
              $set: {...updateBlogDto},

          }
      )
      return res;
  }
}