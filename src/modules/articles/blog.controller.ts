import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { BlogsService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthorChecker } from '../../common/guard/author-checker.guard';
import { DeleteBlogDto } from './dto/delete-blog-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('blogs') //for swagger docs
@UseGuards(AuthorChecker)
@UseGuards(AuthGuard)
@Controller('blogs')
@UsePipes(new ValidationPipe())
export class BlogsController {
  //blog service implements the business logics
  constructor(private readonly blogsService: BlogsService) {}

  //this controller creates a new blog
  @Post('/post')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  //this controller returns all the blogs
  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  //this controller returns a blog with the id in parameter
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  //this contrller updates existing blog fields 
  @Patch('update')
  update(@Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(updateBlogDto);
  }

  //this controller deletes a blog from the blogs collection
  @Delete('remove')
  remove(@Body() deleteBlogDto: DeleteBlogDto) {
    return this.blogsService.remove(deleteBlogDto);
  }
}
