import * as Router from 'koa-router';
import { Context } from 'koa';

const router: Router = new Router();

router.get('/*', async (ctx: Context) => {
  ctx.body = 'Hello World!';
});

export { router };
