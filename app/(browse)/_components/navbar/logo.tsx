import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"]
})


export function Logo() {
    return (
    <Link href="/">
        <div className="hidden lg:flex  h-full gap-x-4 hover:opacity-75 transition">
            <div className="bg-white rounded-full p-1">
                <Image
                    src="spooky.svg"
                    alt="Streamable"
                    width={32}
                    height={32}
                />
            </div>
            <div className={cn(font.className)}>
                <p className="text-lg font-extrabold">Gamehub</p>
                <p className="text-xs font-normal text-muted-foreground">Let&apos;s play</p>
            </div>
        </div>
    </Link>
  )
}
