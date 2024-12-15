import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthService } from "src/services/auth.service";

@Controller('users/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async loginUser(@Body() body: {email : string; password : string}){
        try {
            const findUser = await this.authService.loginUser({
                email: body.email,
                password: body.password,
            })
            return {
                status : "ok",
                res : 200,
                findUser
            }
        } catch (error) {
            console.log(error)
            return {
                status : error,
                res : 400
            }
        }
    }

    @Get(':id')
    async getUserById(@Param("id") id : string, res : Response){
        try {
            const findUser = await this.authService.getUserById(id)
            return {
                status : "ok",
                res : 200,
                findUser
            }
        } catch (error) {
            console.log(error)
            return {
                status : error,
                res : 400
            }
        }
    }

    @Get('getauth')
    async getAuthApi(){
        return "THIS IS ATUH"
    }
}