import { Body, Injectable } from "@nestjs/common";
import { compare } from "bcrypt";
import { createToken } from "src/helpers/createToken";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AuthService{
    constructor(private prisma : PrismaService){}

    async loginUser(data : {email : string , password : string}){
        const user  = await this.prisma.user.findFirst({
            where : {
                    email : data.email
            }
        }) 

        if(!user) throw "Email not found"

        const isValidPass = await compare(data.password, user.password)
        if (!isValidPass) throw "Wrong Password"

        const token = createToken({user_id : user.user_id, email : user.email}, "15m")

        return { token }
    }
}