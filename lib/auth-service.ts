import { currentUser } from "@clerk/nextjs";

import { db } from "./db";

export async function getSelf() {
  const self = await currentUser();

  if (!self || !self.username) throw new Error("Unauthorized")

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    }
  })

  if (!user) throw new Error("Not found")

  return user;
}

export async function getSelfByUsername(username: string) {
  const self = await currentUser();

  if (!self || !self.username) throw new Error("Unauthorized")

  const user = await db.user.findFirst({
    where: { username }
  })

  if(!user) throw new Error("User Not Found!")
  if(self.username !== user.username) throw new Error("Unauthorized")

  return user;
}
