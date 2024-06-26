"use server"

import { revalidatePath } from "next/cache"
import { Stream } from "@prisma/client"

import { db } from "../lib/db"
import { getSelf } from "../lib/auth-service"
import { getStreamByUserId } from "../lib/stream-service"


export async function updateStream(values: Partial<Stream>) {
  try{
    const self = await getSelf();
    const selfStream = await getStreamByUserId(self.id);

    if(!selfStream) throw new Error("Stream not found")

    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly
    };

    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      }
    });

    revalidatePath(`/u/${self.username}/chat`)
    revalidatePath(`/u/${self.username}`)
    revalidatePath(`/${self.username}`)

  } catch {
    throw new Error("Internal Error")
  }
}
