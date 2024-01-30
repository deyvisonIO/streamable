"use server"

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";
import { envServer } from "@/env";
const roomService = new RoomServiceClient(
  envServer.LIVEKIT_API_URL,
  envServer.LIVEKIT_API_KEY,
  envServer.LIVEKIT_API_SECRET,
);

export async function onBlock(id: string) {
  const self = await getSelf();
  const blockedUser = await blockUser(id);

  revalidatePath(`/u/${self.username}/community`)

  return blockedUser;
}

export async function onUnblock(id: string) {
  const self = await getSelf();
  const unblockedUser = await unblockUser(id);

  revalidatePath(`/u/${self.username}/community`)
  return unblockedUser;
}
