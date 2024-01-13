"use client"

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar"
import { useEffect } from "react";

import { useMediaQuery } from "usehooks-ts"

interface containerProps {
  children: React.ReactNode,
}

export function Container({children}: containerProps) {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);


  useEffect(() => {
    if(matches) onCollapse();
    else onExpand();
  }, [matches, onCollapse, onExpand])

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >{children}</div>
  )
}
