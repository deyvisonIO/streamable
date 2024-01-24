import { db } from "./db"

export async function getUserById(id: string) {
  const user = await db.user.findUnique({
    where: {
      id
    },
    include: {
      stream: true,
    }
  })

  return user

}

export async function getUserByUsername(username: string) {
  const user = await db.user.findUnique({
    where: {
      username
    },
    include: {
      stream: true,
      _count: {
        select: {
          followedBy: true,
        }
      }
    }
  })

  return user
}
