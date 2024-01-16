"use client"

import { Button } from "@/components/ui/button"
import { Hint } from "@/components/ui/hint"
import { useCreatorSidebar } from "@/store/use-creator-sidebar"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"


export function Toggle() {
  const { collapsed, onExpand, onCollapse } = useCreatorSidebar((state) => state)
  const label = collapsed ? "Expand" : "Collapse"
  return (
    <>
      {collapsed && (
        <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
          <Hint label={label} asChild side="right">
            <Button
              onClick={onExpand}
              variant="ghost"
              className="h-auto p-2"
            >
              <ArrowRightFromLine className="h-4 w-4"/>
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
          <p className="font-semibold text-primary">Dashboard</p>
          <Hint label={label} asChild side="right">
            <Button
              onClick={onCollapse}
              variant="ghost"
              className="h-auto p-2 ml-auto"
            >
              <ArrowLeftFromLine className="h-4 w-4"/>
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}
