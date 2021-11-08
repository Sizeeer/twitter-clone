import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import { db } from "../db/db";
import { createHashMd5 } from "../utils/createHash";

const Users = db.Users;

passport.use(
  new LocalStrategy(async (username, password, done): Promise<void> => {
    try {
      const user = await Users.findOne({
        where: {
          login: username,
        },
      });

      if (!user) {
        return done(null, false);
      }
      if (user.password === createHashMd5(password + process.env.SECRET_KEY)) {
        return done(null, user.toJSON());
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("token"),
      secretOrKey: process.env.SECRET_KEY || "sveefsdvsdgewvsd",
    },
    (payload: { data: any }, done) => {
      try {
        done(null, payload.data);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export { passport };
