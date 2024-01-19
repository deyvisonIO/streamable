"use client"

import { useViewerToken } from "@/lib/hooks/use-viewer-token"
import { Stream, User } from "@prisma/client"

import { LiveKitRoom } from "@livekit/components-react"
import { Video } from "./video";

interface streamPlayerProps {
  user: User & { stream: Stream | null },
  stream: Stream,
  isFollowing: boolean,
}

export function StreamPlayer({user, stream,isFollowing}: streamPlayerProps) {
  const { name, token, identity } = useViewerToken(user.id);

  if(!token || !name || !identity) {
    return (
      <div>
        Cannot Watch Stream!
      </div>
    )
  }

  console.log({ name, username: user.username })
  console.log({ identity, username: user.id })

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username} hostIdentity={user.id}/>
        </div>
      </LiveKitRoom>
    </>
  )
}
