import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as cors from '@koa/cors';
import * as winston from 'winston';
import * as session from 'koa-session';
import * as passport from 'koa-passport';

import { logger } from './logging';
import { privateRoutes } from './routes/private-routes';
import { publicRoutes } from './routes/public-routes';
import { Auth } from './auth';

const app: Koa = new Koa();

app.use(helmet());
app.use(cors());
app.use(logger(winston));
app.use(bodyParser());

app.keys = ['some-secret-key'];
app.use(session({ key: 'sID' }, app));
Auth.setupStrategies();
app.use(passport.initialize());
app.use(passport.session());

app.use(publicRoutes.routes());
app.use(Auth.guard);
app.use(privateRoutes.routes());

app.listen(3000);

console.log('Server running on port 3000');
