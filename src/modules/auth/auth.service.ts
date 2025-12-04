import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegistrationDto } from './dto/register.dto';
import { AuthRepo } from './auth.repo';
import { LoginDto } from './dto/login.dto';
import { ResponseInterface } from '../../common/interface/response.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authRepo: AuthRepo
    ){}

    //method for generating access token
    async generate_access_token(payload: any){
       let token = await this.jwtService.signAsync(payload)
       return token
    }
    
    //method for hashing password
    hashPassword(pass:string) {return bcrypt.hash(pass,10)}

    //method for varifying password
    comparePassword(present: string, permanent: string){return bcrypt.compare(present,permanent)}
    
    //method for registration process
    //used in register() controller
    async register(registrationDto: RegistrationDto) {
        let lookup = await this.authRepo.findByEmail(registrationDto.email)
        if(lookup){
            throw new ConflictException("user already exists")
        }
        let hashedPassword = await this.hashPassword(registrationDto.password)
        registrationDto.password = hashedPassword
        let new_user = await this.authRepo.create(registrationDto)
        return new ResponseInterface({message:"registration successful",data:new_user})
    }

    //method for login process
    //used in login() controller
    async login(data: LoginDto){
        let user = await this.authRepo.findByEmail(data.email)
        if(!user){
          throw new UnauthorizedException("user not found")
        }
        let validate = await this.comparePassword(data.password,user.password)
        if(!validate){
          throw new UnauthorizedException("invalid Password")
        }
        
        let payload = {sub: {userId:user._id,fullname:user.fullname,username:user.username}}
        let accessToken = await this.generate_access_token(payload)
        return new ResponseInterface({message:"login successful",accessToken:accessToken})
    }
}
