import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IUserDecorator {
  id: string;
}

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = request.user.sub;
    return { id };
  },
);
