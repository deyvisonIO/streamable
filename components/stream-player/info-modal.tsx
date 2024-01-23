"use client"

import { useState, useTransition, useRef, ElementRef } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { updateStream } from "@/actions/stream"
import { toast } from "sonner"
import { UploadDropzone } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { Hint } from "../ui/hint"
import { Trash } from "lucide-react"
import Image from "next/image"

interface infoModalProps {
  initialName: string,
  initialThumbnailUrl: string | null,
}


export function InfoModal({ initialName, initialThumbnailUrl}:infoModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null)


  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const onRemove = () => {
    startTransition(() => {
      toast.promise(updateStream({ thumbnailUrl: null }), {
        loading: "Loading...",
        success: () => {
          setThumbnailUrl("");
          closeRef?.current?.click();
          return "Thumbnail Removed"
        },
        error: "Something went wrong",
      })
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      toast.promise(updateStream({ name }), {
        loading: "Loading...",
        success: () => {
          closeRef?.current?.click();
          return "Stream name updated"
        },
        error: "Something went wrong"
      })
    })
  }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit stream info
          </DialogTitle>
        </DialogHeader>
        <form  onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>
              Name
            </Label>
            <Input
              placeholder="Stream name"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>
              Thumbnail
            </Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-10">
                  <Hint label="Remove thumbnail" side="left" asChild>
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4"/>
                    </Button>
                  </Hint>
                </div>
                <Image
                  alt="Thumbnail"
                  src={thumbnailUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFFF",
                    },
                    allowedContent: {
                      color: "#FFFFFF",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res[0]?.url)
                    router.refresh();
                    closeRef?.current?.click();
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button variant="primary" type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
