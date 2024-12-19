import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { PostController } from "src/controllers/post.controller";
import { PrismaService } from "src/prisma.service";
import { PostService } from "src/services/post.service";
import { JwtStrategy } from "src/helpers/jwtStrategy";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'nestjs-farum',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers : [PostController],
    providers : [PostService, PrismaService, JwtStrategy],
    exports: [JwtModule]
})

export class PostModule{}