import dotenv from "dotenv"
import { Router, Request, Response } from "express"
import passport from "passport"
import jwt from "jsonwebtoken"

dotenv.config()
const router = Router()

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
)

router.get(
  "/auth/google/redirect",
  passport.authenticate("google", { session: false }),
  (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(404).send("User not found!")
    }

    const body = {
      id: req.user.id,
      email: req.user.email,
    }

    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .send("Internal server error, server config invalid")
    }

    const token = jwt.sign({ user: body }, process.env.JWT_SECRET)

    res.send({ token })
  }
)

// Currently does not do anything since JWTs are client-side tokens
// Eventually should use a Redis store for invalidated/expired JWTs
// when a logout occurs
router.get("/auth/logout", (req: Request, res: Response) => {
  req.logout()
  res.send(req.user)
})

export default router
