import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { hashPass } from "src/helpers/hashPassword";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: Prisma.userCreateInput) {
        try {
            const hashedPassword = await hashPass(data.password);
    
            const findUser = await this.prisma.user.findFirst({
                where: {
                    OR: [
                        { username: data.username },
                        { email: data.email }
                    ]
                }
            });
    
            if (findUser.email) throw new Error("Email already registered");
            if (findUser.username) throw new Error("Username already registered");
            
            const result = await this.prisma.user.create({
                data: {
                    ...data,
                    password: hashedPassword
                }
            });
    
            return result;
        } catch (error) {
            // console.error('Error saat menyimpan user:', error); // Log error asli
            throw new Error(error.message || 'Gagal menyimpan data ke database');
        }
    }
    

    async getUser() {
        return this.prisma.user.findMany()
    }
}