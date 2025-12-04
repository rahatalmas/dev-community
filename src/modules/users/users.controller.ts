import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto} from './dto/user.dto';
import { UserSkillNExpRemoveDto } from './dto/user.remove.skill.n.exp.dto';
import { UserSkillNExpUpdateDto } from './dto/user.update.skill.n.exp.dto';
import { AuthorChecker } from '../../common/guard/author-checker.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@UseGuards(AuthorChecker)
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  //constructor: userService from business logic
  constructor(private readonly usersService: UsersService) {}

  //gets all user-> route: http://hostname/users
  @Get('')
  findAll() {
    return this.usersService.findAll();
  }

  //gets user with the id given in parameter
  //route: http://hostname/users/123456mongoobjectid
  @Get(':id')
  findOne(@Param('id') id: string) {
     console.log("Controller lever- User Profile data: ")
    return this.usersService.findOneWithProfileData(id)
  }

  //updates user with the id given in parameter
  //route: http://hostname/users/update/123456mongoobjectid
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }

  //updates existing values from a users skill or experience array
  //route: http://hostname/users/update/showcase/replace
  @Patch('update/showcase/replace')
  async updateSkillOrExperience(@Body() data:UserSkillNExpUpdateDto){
    return this.usersService.updateSkillOrExperience(data)
  }

  //deletes any skill from a users skill array
  //route: http://hotname/users/remove/skill
  @Delete('remove/skill')
  removeSkill(@Body() rmSkill: UserSkillNExpRemoveDto){
     return this.usersService.removeSkill(rmSkill)
  }

  //deletes any experience from a users skill array
  //route: http://hostname/users/remove/experience
  @Delete('remove/experience')
  removeExperience(@Body() rmExp: UserSkillNExpRemoveDto){
     return this.usersService.removeExperience(rmExp)
  }

  //deletes a user from the users collection
  //route: http://hostname/users/remove/12345mongoid
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
