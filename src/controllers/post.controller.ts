import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/helpers/jwtAuthGuard";
import { PostService } from "src/services/post.service";

@Controller("post")
export class PostController {
    constructor(private readonly postService: PostService) { }

    @UseGuards(JwtAuthGuard)
    @Post("/create")
    async createPost(@Body() body: { title: string; description: string }, req: any) {
        try {
            const createPost = await this.postService.createPost({
                title: body.title,
                description: body.title,
                // image : body.image,
            }, req)
            return {
                status: "success",
                data: createPost
            };
        } catch (error) {
            return {
                status: error,
                res: 400
            }
        }
    }

    @UseGuards(JwtAuthGuard) 
    @Get('/get/token')
    async getPostByIdToken(@Req() req: any) {
        try {
            console.log('Request User:', req.user);
            const post = await this.postService.getPostByIdWithToken(req.user?.user_id);
            console.log('Posts Retrieved:', post);

            return {
                status: 'success',
                post
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.massage ,
                res: 400,
            };
        }
    }

    @Get("/get/:user_id")
    async getPostById(@Param() {user_id} : {user_id : string}){
        try {
            const findUserPost = await this.postService.getPostById(user_id)

            if(!findUserPost) throw "User not found"

            return {
                status : "Success",
                findUserPost
            }
        } catch (error) {
            return {
                status : "error",
                message : error,
                res : 400
            }
        }
    }
}