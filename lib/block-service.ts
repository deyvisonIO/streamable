import { db } from "./db"
import { getSelf } from "./auth-service";
import { Jua } from "next/font/google";



export async function isBlockedByUser(id:string) {
  try {
    const self = await getSelf();

    if (self.id === id) return false

    const otherUser = await db.user.findUnique({
      where: {
        id,
      }
    });

    if (!otherUser) throw new Error("User Not Found!")


    const existingBlock = await db.block.findUnique({
      where:{
        blockerId_blockedId: {
          blockedId: self.id,
          blockerId: otherUser.id,
        }
      }
    });

    return !!existingBlock;

  } catch {
    return false;
  }
}

export async function blockUser(id: string) {
  const self = await getSelf();

  if (self.id === id) throw new Error("Can't block yourself!")


  const otherUser = await db.user.findUnique({
    where: { id, }
  })

  if (!otherUser) throw new Error("User Not Found!")

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: otherUser.id,
        blockerId: self.id
      }
    }
  })

  if (!!existingBlock) throw new Error("User already blocked!")


  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true
    }
  })

  return block;
}
export async function unblockUser(id: string) {
  const self = await getSelf();

  if (self.id === id) throw new Error("Can't unblock yourself!")

  const otherUser = await db.user.findUnique({
    where: { id, }
  })

  if (!otherUser) throw new Error("User Not Found!")

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: otherUser.id,
        blockerId: self.id
      }
    }
  })

  if (!existingBlock) throw new Error("User not blocked!")


  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true
    }
  });

  return unblock;
}
