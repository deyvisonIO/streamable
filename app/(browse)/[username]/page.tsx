import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface userPageProps {
  params: {
    username: string,
  }
}
export default async function UserPage({params}: userPageProps) {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) return notFound();

  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) return notFound();

  return (
    <StreamPlayer
      user={user}
      stream={user.stream}
      isFollowing={isFollowing}
    />
  )
}
