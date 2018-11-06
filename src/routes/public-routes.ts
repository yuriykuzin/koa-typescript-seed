import * as Router from 'koa-router';
import * as fs from 'fs';
import * as passport from 'passport';
import * as path from 'path';
import { Context } from 'koa';

const publicRoutes: Router = new Router();

publicRoutes.get('/login', async (ctx: Context) => {
  ctx.type = 'html';
  ctx.body = fs.readFileSync(path.resolve('./src/views/login.html'));
});

publicRoutes.get('/auth/facebook', passport.authenticate('facebook'));

publicRoutes.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

publicRoutes.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

publicRoutes.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

publicRoutes.get('/logout', (ctx: Context) => {
  ctx.logout();
  ctx.redirect('/');
});

export { publicRoutes };
