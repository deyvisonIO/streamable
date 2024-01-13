import { db } from "./db"
import { getSelf } from "./auth-service"

export async function getRecommended() {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return users;
}
