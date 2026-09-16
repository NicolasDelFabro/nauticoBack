import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { SolicitarCodigoDto } from './dto/solicitar-codigo.dto';
import { CambiarPasswordDto } from './dto/cambiar-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resultado = await this.authService.login(loginDto);

    res.cookie('access_token', resultado.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      mustChangePassword: resultado.mustChangePassword,
      usuario: resultado.user,
    };
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Sesión cerrada' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: Request) {
    return req.user;
  }

  @Post('solicitar-codigo')
  @HttpCode(200)
  solicitarCodigo(@Body() dto: SolicitarCodigoDto) {
    return this.authService.solicitarCodigo(dto.dni, dto.email);
  }

  @Post('cambiar-password')
  @HttpCode(200)
  cambiarPassword(@Body() dto: CambiarPasswordDto) {
    return this.authService.cambiarPassword(dto.dni, dto.codigo, dto.nuevaPassword);
  }
}