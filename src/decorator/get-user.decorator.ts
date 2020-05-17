import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../auth/user.entity';

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);