import { db } from "./db";
import { getSelf } from "./auth-service"


export async function isFollowingUser(id: string) {
  try {
    const self = await getSelf();

    if (self.id === id) return true

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!otherUser) throw new Error("User not found!")


    // TODO: Replace findFirst with findUnique for faster query
    const existingFollow = await db.follow.findFirst({
      where: {
        followingId: otherUser.id,
        followerId: self.id,
      }
    });

    return !!existingFollow;

  } catch {
    return false
  }
}

export async function followUser(id: string) {
  const self = await getSelf();

  if (self.id === id) throw new Error("Cannot follow yourself!")

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) throw new Error("User not found!")


  const existingFollow = await db.follow.findFirst({
    where: {
      followingId: otherUser.id,
      followerId: self.id,
    }
  });
  if (existingFollow) throw new Error("Already following user");

  const follow = await db.follow.create({
    data: {
      followingId: otherUser.id,
      followerId: self.id,
    },
    include: {
      following: true,
      follower: true,
    }
  });

  return follow;
}

export async function unFollowUser(id: string) {
  const self = await getSelf();

  if (self.id === id) throw new Error("Cannot unfollow yourself!")

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) throw new Error("User not found!")



  const existingFollow = await db.follow.findFirst({
    where: {
      followingId: otherUser.id,
      followerId: self.id,
    }
  });
  if (!existingFollow) throw new Error("Not following user");

  const unfollow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    }
  });

  return unfollow;
}

export async function getFollowedUsers() {
  try {
    const self = await getSelf();

    const followedUsers = db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id,
            }
          }
        }
      },
      include: {
        following: true,
      }
    });

    return followedUsers;
  } catch {
    return []
  }

}
