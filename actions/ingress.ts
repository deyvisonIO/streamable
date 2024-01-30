"use server"

import  {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions
} from "livekit-server-sdk"

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models"

import { db } from "@/lib/db"
import { getSelf } from "@/lib/auth-service"
import { revalidatePath } from "next/cache"
import { envServer } from "@/env"

const roomService = new RoomServiceClient(
  envServer.LIVEKIT_API_URL!,
  envServer.LIVEKIT_API_KEY!,
  envServer.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(envServer.LIVEKIT_API_URL!);

export async function resetIngresses(hostIdentity: string) {
  const ingresses = await ingressClient.listIngress({ roomName: hostIdentity });

  const rooms = await roomService.listRooms([hostIdentity]);

  for(const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for(const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
}

export async function createIngress(ingressType: IngressInput) {
  const self = await getSelf();

  // Reset previous ingress
  await resetIngresses(self.id);

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  }

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    }
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    }
  }

  const ingress = await ingressClient.createIngress(ingressType, options);


  if(!ingress || !ingress.url || !ingress.streamKey) throw new Error("Failed to create ingress")

  await db.stream.update({
    where: {
      userId: self.id,
    },
    data: {
      ingressId: ingress.ingressId,
      streamKey: ingress.streamKey,
      serverUrl: ingress.url,
    },
  })

  revalidatePath(`/u/${self.username}/keys`)

  return ingress;
}
