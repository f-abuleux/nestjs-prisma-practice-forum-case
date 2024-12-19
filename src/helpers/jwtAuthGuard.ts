import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Logika tambahan sebelum pemanggilan strategi
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        console.log('Error:', err); // Log error jika ada
        console.log('User:', user); // Log user dari strategi
        console.log('Info:', info); // Informasi tambahan Passport
        if (err || !user) {
            throw err || new Error('Unauthorized');
        }
        return user; // Mengembalikan objek user yang tersedia di req.user
    }
}
