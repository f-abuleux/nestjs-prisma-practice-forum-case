import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { Request } from "express";
import { hashPass } from "src/helpers/hashPassword";
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
            if (!body.password) {
                throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
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
                created
            };
        } catch (error) {
            console.error('Error:', error.message || error);
            throw new HttpException(
                error.message || 'Gagal menyimpan data ke database',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

}