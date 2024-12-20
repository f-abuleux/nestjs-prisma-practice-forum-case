import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { hashPass } from "src/helpers/hashPassword";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async createUser(data: Prisma.userCreateInput) {
        return this.prisma.$transaction(async (prisma) => {
            const hashedPassword = await hashPass(data.password);

            const findUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { username: data.username },
                        { email: data.email }
                    ]
                }
            });

            if (findUser) {
                if (findUser.email === data.email) throw "Email already registered";
                if (findUser.username === data.username) throw "Username already registered";
            }

            const result = await prisma.user.create({
                data: {
                    ...data,
                    password: hashedPassword
                }
            });
            return { result };
        });
    }

    async getUser() {
        return this.prisma.user.findMany()
    }
}