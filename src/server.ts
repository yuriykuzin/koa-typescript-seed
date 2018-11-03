import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as cors from '@koa/cors';
import * as winston from 'winston';

import { logger } from './logging';
import { router } from './routes';

const app: Koa = new Koa();

app.use(helmet());
app.use(cors());
app.use(logger(winston));
app.use(bodyParser());

app.use(router.routes());

app.listen(3000);

console.log('Server running on port 3000');
