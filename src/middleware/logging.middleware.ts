import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    }
}

@Injectable()
export class VerifyToken implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: Error | any) => void) {
        try {
            let token = req.headers.authorization?.replace("Bearer ", "")

            if (!token) return res.status(401).send({ msg: 'Unauthorized' });

            const user = verify(token, process.env.SECRET_KEY!)
            if(!user) return res.status(401).send({ msg : "Unauthorized user"})
            
            req.user = user as User
            
            next()
        } catch (error) {
            res.status(400).send({
                status: "Error",
                msg: error
            })
        }
    }
}