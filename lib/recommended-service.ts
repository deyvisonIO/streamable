import { db } from "./db"
import { getSelf } from "./auth-service"
import { User } from "@prisma/client";

export async function getRecommended() {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users: User[] = [];

  if(userId) {
    users = await db.user.findMany({
      where: {
        AND: [{
          NOT: {
            id: userId,
          },
        },
        {
          NOT: {
            followedBy: {
              some: {
                followerId: userId,
              }
            }
          }
        }
        ]
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
  }

  return users;
}
