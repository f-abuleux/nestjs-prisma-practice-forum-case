import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AuthController } from "src/controllers/auth.controller";
import { LoggerMiddleware } from "src/middleware/logging.middleware";
import { PrismaService } from "src/prisma.service";
import { AuthService } from "src/services/auth.service";

@Module({
    controllers: [AuthController],
    providers:  [AuthService, PrismaService]
})

export class AuthModule{
    configure(consumer: MiddlewareConsumer){
        consumer
        .apply(LoggerMiddleware)
        .forRoutes({
            path : 'users/auth/login',
            method : RequestMethod.POST
        })
    }
}