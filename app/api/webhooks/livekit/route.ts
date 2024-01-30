import { headers } from "next/headers"
import { WebhookReceiver } from "livekit-server-sdk"

import { db } from "@/lib/db"
import { envServer } from "@/env";

const receiver = new WebhookReceiver(
  envServer.LIVEKIT_API_KEY,
  envServer.LIVEKIT_API_SECRET
)

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get("Authorization")

  if (!authorization) return new Response("No Authorization Header", { status: 400 })

  const event = receiver.receive(body, authorization);

  switch (event.event) {
    case "ingress_started":
      await db.stream.update({
        where: {
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: true,
        }
      })
      return new Response("Stream Started!", { status: 200 })
    case "ingress_ended":
      await db.stream.update({
        where: {
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: false,
        }
      })
      return new Response("Stream Ended!", { status: 200 })
  }

  return new Response("")
}

