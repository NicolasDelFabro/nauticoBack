import { Post, Body, Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post("login")
    async login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    };
}