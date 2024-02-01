import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"]
})


export function Logo() {
    return (
    <Link href="/" >
        <div className="flex items-center gap-x-4 hover:opacity-75 transition">
            <div className="bg-white rounded-full p-1 shrink-0 mr-12 lg:mr-0 lg:shrink">
                <Image
                    src="spooky.svg"
                    alt="Streamable"
                    width={32}
                    height={32}
                />
            </div>
            <div className={cn("hidden lg:block", font.className)}>
                <p className="text-lg font-semibold">Streamable</p>
                <p className="text-xs text-muted-foreground">Creator dashboard</p>
            </div>
        </div>
    </Link>
  )
}

export function LogoSkeleton() {
  return (
    <Skeleton className="w-8 h-8"/>
  )
}
