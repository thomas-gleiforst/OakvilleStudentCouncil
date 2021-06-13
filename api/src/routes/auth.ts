import { Router, Request, Response, response } from "express"
import passport from "passport"

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
  (_, res: Response) => res.send("Authenticated!")
)

router.get("/auth/logout", (req: Request, res: Response) => {
  req.logout()
  res.send(req.user)
})

export default router
