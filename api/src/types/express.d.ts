import { User as UserModelType } from "../entity/User"

declare global {
  namespace Express {
    interface User extends UserModelType {
      id: string
      email: string
    }
  }
}

export {}
