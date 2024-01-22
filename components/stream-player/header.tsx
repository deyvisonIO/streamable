"use client"

import { UserAvatar, UserAvatarSkeleton } from "@/components/ui/user-avatar"
import { VerifiedMark } from "../ui/verified-mark"
import { useParticipants, useRemoteParticipant } from "@livekit/components-react"
import { UserIcon } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";

interface headerProps {
  hostIdentity: string,
  hostName: string,
  viewerIdentity: string,
  imageUrl: string,
  name: string,
  isFollowing: boolean,
}

export function Header({ hostIdentity, hostName, viewerIdentity, imageUrl, name, isFollowing  }:headerProps) {
  const participants = useParticipants();
  const streamer = useRemoteParticipant(hostIdentity);

  const isLive = !!streamer;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">
            {name}
          </p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
              <UserIcon className="h-4 w-4"/>
              <p>
                {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-sm text-muted-foreground">
                Offline
            </p>
          )}
        </div>
      </div>
      <Actions
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
        isHost={isHost}
      />
    </div>
  )
}

export function HeaderSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32"/>
          <Skeleton className="h-4 w-24"/>
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  )
}
