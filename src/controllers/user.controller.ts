import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { randomUUID } from "crypto";
import { UserService } from "src/services/user.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUser() {
        return this.userService.getUser()
    }


    @Post('create')
    async createUser(@Body() body: { username: string; email: string; password: string }) {
        try {
            if (!body.username || !body.email || !body.password) {
                return {
                    status: 'error',
                    res: 400,
                    message: 'All fields are required',
                };
            }    

            const created = await this.userService.createUser({
                username: body.username,
                email: body.email,
                password: body.password,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return {
                status: 'ok',
                res: 200,
                created,
            };
        } catch (error) {
            return {
                status : error,
                res : 400
            }
        }
    }
}