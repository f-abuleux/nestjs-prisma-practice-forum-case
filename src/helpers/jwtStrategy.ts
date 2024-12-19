import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Token diambil dari header Authorization
            ignoreExpiration: false, // Pastikan token tidak kadaluarsa
            secretOrKey: process.env.JWT_SECRET || 'nestjs-farum', // Gunakan secret yang sesuai
        });
    }
    

    async validate(payload: any) {
        console.log('JWT Payload:', payload); // Log payload
        if (!payload) {
            throw new Error('Invalid token');
        }
        return { user_id: payload.user_id, email: payload.email }; // Pastikan ini sesuai dengan token
    }
    
}
    