import dotenv from "dotenv"
import passport from "passport"
import { Strategy } from "passport-google-oauth20"
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import { getManager } from "typeorm"

import { User } from "../entity/User"

dotenv.config()

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/auth/google/redirect",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const manager = getManager()
      const user = await manager.findOne(User, { id: profile.id })

      try {
        if (user) {
          done(null, user)
        } else {
          const newUser = manager.create(User, {
            email: profile.emails && profile.emails[0].value,
            id: profile.id,
            firstName: profile.name && profile.name.givenName,
            middleName: profile.name && profile.name.middleName,
            lastName: profile.name && profile.name.familyName,
            loginDate: new Date(Date.now()),
            points: 0,
            role: "student",
          })
          const savedStudent = await manager.save(newUser)
          done(null, savedStudent)
        }
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (jwtToken, done) => {
      if (jwtToken.user) {
        return done(null, jwtToken.user)
      }
      return done("Invalid/expired token")
    }
  )
)

export { passport }
