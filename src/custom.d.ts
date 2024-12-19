type User = {
    user_id: string
    email: string
}

declare namespace Express {
    export interface Request {
        user?: User
        file?: Multer.File;
    }
}