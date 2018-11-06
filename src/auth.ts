import * as passport from 'koa-passport';
import { Context } from 'koa';
import { Strategy as FacebookStrategy, Profile } from 'passport-facebook';
import { Strategy as LocalStrategy } from 'passport-local';

import { config } from './config';

interface IUser {
  id: number;
  username: string;
  password: string;
}

const fetchUser: () => Promise<IUser> = (() => {
  // This is an example!
  const user: IUser = {
    id: 1,
    username: 'test',
    password: 'test',
  };

  return async () => user;
})();

export class Auth {
  public static setupStrategies(): void {
    passport.serializeUser((user: IUser, done: Function) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (_id: number, done: Function) => {
      try {
        const user: IUser = await fetchUser();
        done(null, user);
      } catch (err) {
        done(err);
      }
    });

    passport.use(
      new LocalStrategy(
        async (
          username: string,
          password: string,
          done: (err: any, user?: {} | undefined) => void,
        ) => {
          try {
            const user: IUser = await fetchUser();

            // later on we'll use hash check here of course
            if (username === user.username && password === user.password) {
              done(null, user);

              return;
            }

            done(null, false);
          } catch (err) {
            done(err);
          }
        },
      ),
    );

    passport.use(
      new FacebookStrategy(
        {
          clientID: config.facebookClientId,
          clientSecret: config.facebookClientSecret,
          callbackURL: `${config.baseApiUrl}/auth/facebook/callback`,
        },
        (_accessToken: string, _refreshToken: string, _profile: Profile, done: Function) => {
          // this is just a sample
          fetchUser().then((user: IUser) => done(null, user));
        },
      ),
    );
  }

  public static addGuard(ctx: Context, next: Function): Promise<any> | void {
    if (ctx.isAuthenticated()) {
      return next();
    }

    ctx.redirect('/login');
  }
}
