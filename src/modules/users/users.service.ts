import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { UsersRepo } from './users.repo';
import { UpdateUserDto } from './dto/user.dto';
import { ResponseInterface } from '../../common/interface/response.interface';
import { UserSkillNExpRemoveDto } from './dto/user.remove.skill.n.exp.dto';
import { UserSkillNExpUpdateDto } from './dto/user.update.skill.n.exp.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UsersRepo,
  ){}

  //returns list of users
  async findAll() {
    let data = await this.userRepo.findAll()
    return new ResponseInterface({message:"all users",data:data})
  }


  //returns a user with the id in param
  async findOne(id: string) {
    let user = await this.userRepo.finfById(id)
    return new ResponseInterface({message:`user with id: ${id}`,data:user})
  }


  async findOneWithProfileData(id: string){
    let userData = this.userRepo.findOneWithProfileData(id)
    return userData
  }

  //updates a users data
  async update(id: string, data: UpdateUserDto) {
    let res = await this.userRepo.update(id,data)
    return new ResponseInterface({message:`user with id: ${id} updated`,data:res})
  }

  //updates existing skills or experience
  async updateSkillOrExperience(data:UserSkillNExpUpdateDto){
    if (!["skills", "experience"].includes(data.qType)) {
        throw new BadRequestException("Invalid qType, Must be skill or experience");
    }
    let res = await this.userRepo.replaceSkillOrExperience(data.uId,data.qType,data.key,data.value)
    if(res.modifiedCount==0){
      throw new NotFoundException("skill doesn't exist to profile")
    }
    return new ResponseInterface({message:"Skill replaced with new value",data:res})
  }

  //removes an experience from the experience list
  async removeExperience(rmExp: UserSkillNExpRemoveDto){
    return this.userRepo.removeExperiece(rmExp.uId,rmExp.key)
  }

  //removes a skill from the skill list
  async removeSkill(rmSkill: UserSkillNExpRemoveDto){
    return this.userRepo.removeSkill(rmSkill.uId,rmSkill.key)
  }

  //removes an user from the collection
  remove(id: string) {
    return this.userRepo.delete(id)
  }
}
