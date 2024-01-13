"use client"

import { Button } from "@/components/ui/button";
import { LiveBadge } from "@/components/ui/live-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/ui/user-avatar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation"

interface userItemProps {
  username: string,
  imageUrl: string,
  isLive?: boolean,
}

export function UserItem({username, imageUrl, isLive=false}: userItemProps) {
  const pathname = usePathname();
  const { collapsed } = useSidebar((state) => state)

  const href = `/${username}`;
  const isActive = pathname === href;
  return (
    <Button
      asChild
      variant="ghost"
      className={cn("w-full h-12", collapsed ? "justify-center" : "justify-start", isActive && "bg-accent")}
    >
      <Link href={href}>
        <div className={cn("flex items-center w-full gap-x-4", collapsed && "justify-center")}>
          <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
          {!collapsed && (
            <p className="truncate">
              {username}
            </p>
          )}
          {!collapsed && isLive && (
            <LiveBadge className="ml-auto"/>
          )}
        </div>
      </Link>
    </Button>
  )
}

export function UserItemSkeleton() {
  return (
    <li className="flex items-center w-full gap-x-4 px-3 py-2">
      <Skeleton className="min-h-8 min-w-8 rounded-full"/>
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}
