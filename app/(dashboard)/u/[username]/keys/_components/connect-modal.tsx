"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { AlertTriangle } from "lucide-react"
import { IngressInput } from "livekit-server-sdk"
import { ElementRef, useRef, useState, useTransition } from "react"
import { createIngress } from "@/actions/ingress"
import { toast } from "sonner"
import { map } from "svix/dist/openapi/rxjsStub"


const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type ingressType = typeof RTMP | typeof WHIP;

export function ConnectModal() {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<ingressType>(RTMP)

  const onSubmit = () => {
    startTransition(() => {
      toast.promise(createIngress(parseInt(ingressType)), {
        loading: "Creating Ingress",
        success: () => {
          closeRef?.current?.click()
          return "Ingress created"
        },
        error: "Something went wrong"
      })

    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">
          Generate Connection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate connection</DialogTitle>
        </DialogHeader>
        <Select disabled={isPending} value={ingressType} onValueChange={(value) => setIngressType(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4"/>
          <AlertTitle>
            Warning!
          </AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="primary" disabled={isPending} onClick={onSubmit}>Generate</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
