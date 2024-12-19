import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Request } from "express";
import { PrismaService } from "src/prisma.service";

const baseUrlApi = process.env.BASE_URL_API

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) { }

    async createPost(data: { title: string; description: string }, req: any) {
        const findUser = await this.prisma.user.findFirst({
            where: {
                user_id: req.user.user_id
            }
        })
        if (!findUser) throw "User unidentified"
        // if (data.image) {
        //     const image = `${baseUrlApi}/public/event/${data.image}`
        // }

        const createEvent = await this.prisma.post.create({
            data: {
                title: data.title,
                description: data.description,
                userUser_id: findUser.user_id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
        return { createEvent }
    }

    async getPostByIdWithToken(userId: string) {
        console.log('User ID:', userId);
        const findUser = await this.prisma.user.findFirst({
            where: {
                user_id: userId,
            },
        });

        if (!findUser) {
            throw new Error('User not found');
        }
        console.log('User Found:', findUser);
        const post = await this.prisma.post.findMany({
            where: {
                userUser_id: userId,
            },
        });
        console.log('Posts Found:', post); 

        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    }

    async getPostById(userId:string) {
        const findUser = await this.prisma.user.findUnique({
            where : {
                user_id : userId
            }, include : {
                post : true
            }
        })

        if(!findUser) throw "User not found"

        return findUser
    }
}