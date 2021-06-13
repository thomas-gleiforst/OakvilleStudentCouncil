import dotenv from "dotenv"
import passport from "passport"
import { Strategy } from "passport-google-oauth20"
import { getManager } from "typeorm"

import { Student } from "../entity/Student"

dotenv.config()

// TODO: Time for JWT!
passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/auth/google/redirect",
    },
    async (_, __, profile, cb) => {
      const manager = getManager()
      const user = await manager.findOne(Student, { id: profile.id })

      if (user) {
        cb(null, user)
      } else {
        const newUser = manager.create(Student, {
          email: profile.emails && profile.emails[0].value,
          id: profile.id,
          firstName: profile.name && profile.name.givenName,
          middleName: profile.name && profile.name.middleName,
          lastName: profile.name && profile.name.familyName,
          loginDate: new Date(Date.now()).toISOString(),
          points: 0,
        })
        const savedStudent = await manager.save(newUser)
        cb(null, savedStudent)
      }
    }
  )
)

export { passport }
