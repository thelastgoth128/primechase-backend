import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { UserService } from "src/components/user/user.service";
import { IS_PUBLIC_KEY } from "./public";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService : JwtService,
        private reflector : Reflector,
        private userService : UserService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[
            context.getHandler(),
            context.getClass()
        ])

        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token){
            throw new UnauthorizedException("you have no access token");
        }
        try{
            const data = await this.jwtService.verifyAsync(token)

            request['user'] = data

            const userid = data
        }catch(error){
            throw new UnauthorizedException("access denied", error)
        }
        return true
    }
    private extractTokenFromHeader(request:Request): string | undefined{
        const [type,token] = request.headers.authorization?.split(' ')??[]
        return type == 'Bearer' ? token : undefined
    }
}