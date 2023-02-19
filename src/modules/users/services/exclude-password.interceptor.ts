import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDTO } from 'src/modules/shared/models/user';

@Injectable()
export class ExludePasswordInterceptor implements NestInterceptor {
    intercept(_, next: CallHandler<UserDTO | UserDTO[] | null>): Observable<any> {
        return next.handle().pipe(
            map(result => {
                if (Array.isArray(result)) {
                    return result.map(item => this.transform(item));
                } else {
                    return this.transform(result);
                }
            })
        );
    }

    private transform(user: UserDTO | null): Omit<UserDTO, 'password'> | null {
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } else {
            return null;
        }
    }
}