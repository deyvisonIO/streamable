"use client"
import { useSidebar } from "@/store/use-sidebar"
import { User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./user-item";
import { Stream } from "@prisma/client";

interface recommendedProps {
  data: (User & { stream: Stream | null })[],
}

export function Recommended({data}: recommendedProps) {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
    {showLabel && (
      <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">
            Recommended
          </p>
      </div>
    )}
    <ul className="space-y-2 px-2">
      {data.map(user => (
      <UserItem key={user.id} username={user.username} imageUrl={user.imageUrl} isLive={user.stream?.isLive} />
      ))}
    </ul>
    </div>
  )
}

export function RecommendedSkeleton() {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, index) => <UserItemSkeleton key={index} />)}
    </ul>
  )
}
