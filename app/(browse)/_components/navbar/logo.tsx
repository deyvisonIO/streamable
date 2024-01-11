import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"]
})


export function Logo() {
    return (
    <Link href="/" >
        <div className="flex items-center mr-2 h-full gap-x-4 hover:opacity-75 transition">
            <div className="bg-white rounded-full p-1 shrink-0 mr-8 lg:mr-0 lg:shrink">
                <Image
                    src="spooky.svg"
                    alt="Streamable"
                    width={32}
                    height={32}
                />
            </div>
            <div className={`hidden lg:block ${cn(font.className)}`}>
                <p className="text-lg font-extrabold">Streamable</p>
                <p className="text-xs font-normal text-muted-foreground">Let&apos;s play</p>
            </div>
        </div>
    </Link>
  )
}
