import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

interface userPageProps {
  params: {
    username: string,
  }
}
export default async function UserPage({params}: userPageProps) {
  const user = await getUserByUsername(params.username);

  if (!user) return notFound();

  const isFollowing = await isFollowingUser(user.id)
  return (
    <div className="flex flex-col gap-y-4">
      <p>username: {user.username}</p>
      <p>userId: {user.id}</p>
      <p>isFollowing: {`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  )
}
