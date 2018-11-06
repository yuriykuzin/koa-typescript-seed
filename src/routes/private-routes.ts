import * as Router from 'koa-router';
import { Context } from 'koa';

const privateRoutes: Router = new Router();

privateRoutes.get('/*', async (ctx: Context) => {
  ctx.body = `Hello: ${JSON.stringify(ctx.state.user)}`;
});

export { privateRoutes };
