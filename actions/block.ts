"use server"

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export async function onBlock(id: string) {
 // TODO: Adapt to disconnet user from livestream
 // TODO: Allow ability to kick the guest
  const blockedUser = await blockUser(id);

  revalidatePath("/")

  if(blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`)
  }

  return blockedUser;

}

export async function onUnblock(id: string) {
  const unblockedUser = await unblockUser(id);

  revalidatePath("/")

  if(unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.username}`)
  }

  return unblockedUser;
}
