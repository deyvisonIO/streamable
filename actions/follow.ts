"use server"

import { followUser, unFollowUser } from "@/lib/follow-service"
import { revalidatePath } from "next/cache";


export async function onFollow(id:string) {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/")

    if(followedUser) {
      revalidatePath(`/${followedUser.following.username}`)
    }

    return followedUser;

  } catch(error: unknown) {
    console.log(error)
    throw error
  }
}

export async function onUnfollow(id: string) {
  try {
    const unfollowedUser = await unFollowUser(id);
    revalidatePath("/")
    if(unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`)
    }

    return unfollowedUser;
  } catch(error: unknown) {
    console.error(error)
    throw error
  }

}
