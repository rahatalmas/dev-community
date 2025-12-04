import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/register.dto';
import { AuthRepo } from './auth.repo';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}
    
    //controller for login
    //route: http://hostname/auth/login
    @Post('login')
    login(@Body(new ValidationPipe()) loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    //controller for registration
    //route: http://hostname/auth/register
    @Post('register')
    register(@Body(new ValidationPipe()) registrationDto: RegistrationDto) {
        return this.authService.register(registrationDto);
    }
    
}
