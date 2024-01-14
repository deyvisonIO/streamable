import { db } from "./db"

export async function getUserById(id: string) {
  try {

  } catch {

  }
}

export async function getUserByUsername(username: string) {
  const user = await db.user.findUnique({
    where: {
      username
    }
  })

  return user
}
