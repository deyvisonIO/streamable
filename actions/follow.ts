"use server"

import { followUser, unFollowUser } from "@/lib/follow-service"
import { revalidatePath } from "next/cache";


export async function onFollow(id:string) {
  const followedUser = await followUser(id);

  revalidatePath("/")

  if(followedUser) {
    revalidatePath(`/${followedUser.following.username}`)
  }

  return followedUser;
}

export async function onUnfollow(id: string) {
  const unfollowedUser = await unFollowUser(id);
  revalidatePath("/")
  if(unfollowedUser) {
    revalidatePath(`/${unfollowedUser.following.username}`)
  }

  return unfollowedUser;
}
