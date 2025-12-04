import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { BlogRepository } from './blog.repository';
import { ResponseInterface } from '../../common/interface/response.interface';
import { DeleteBlogDto } from './dto/delete-blog-dto';

@Injectable()
export class BlogsService {

  constructor(private readonly blogRepo:BlogRepository){}

  //this method creates new blog
  //used in create() controller
  async create(createBlogDto: CreateBlogDto) {
    let blog = new Blog(createBlogDto)
    let res = await this.blogRepo.save(blog)
    return new ResponseInterface({message:"blog posted",data: res})
  }

  //this method retuns list of blogs from the blogs collection
  //used in findAll() controller
  async findAll() {
    let blogs = await this.blogRepo.findAllWithRefs()
    if(blogs.length>0){
       return new ResponseInterface({message:"all blogs",data:blogs})
    }else{
      return new ResponseInterface({message:`blogs collection is empty`,data:blogs})
    }
  }

  //this method returns a blog with the id in parameter
  //used in findOne() controller
  async findOne(id: string) {
    let blog =  await this.blogRepo.findByIdWithAuthor(id)
    if(blog.length>0){
      return new ResponseInterface({message:`blog with id: ${id}`,data:blog})
    }else{
      throw new NotFoundException(`blog not found with id: ${id}`)
    }
  }

  //this method updates a blogs data
  //used in update() controller
  async update(updateBlogDto: UpdateBlogDto) {
    let res = await this.blogRepo.updateBlog(updateBlogDto)
    if(res.matchedCount==0){
      throw new NotFoundException(`blog not found with id: ${updateBlogDto.blogId}`)
    }
    return new ResponseInterface({message:`updated blog with id: ${updateBlogDto.blogId}`,data:res})
  }

  //this method removes a blog
  //used in remove() controller
  async remove(deleteBlogDto: DeleteBlogDto) {
      let res = await this.blogRepo.removeBlog(deleteBlogDto)
      if(res.deletedCount==0){
        throw new NotFoundException(`blog not found with id: ${deleteBlogDto.blogId}`)
      }
      return res
  }
}
