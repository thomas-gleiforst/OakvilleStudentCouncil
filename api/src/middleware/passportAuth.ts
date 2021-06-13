import dotenv from "dotenv"
import passport from "passport"
import { Strategy } from "passport-google-oauth20"
import { getConnection } from "typeorm"

import { Student } from "../entity/Student"

dotenv.config()

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await getConnection()
        .createQueryBuilder()
        .select("student")
        .from(Student, "student")
        .where("student.id = :profileID", { profileID: profile.id })
        .getOne()

      if (user) {
        cb(null, user)
      } else {
        // TODO: Create new user
        // const newUser = connection
        //   .createQueryBuilder()
        //   .insert()
        //   .into(Student)
        //   .values({
        //     email: profile.emails.,
        //     id: profile.id,
        //     firstName: profile.,
        //     middleName: profile.middleName,
        //     lastName: profile.familyName,
        //     loginDate: Date.now(),
        //     points: 0,
        //   })
        cb(null, false)
      }
    }
  )
)

export { passport }
