import { getRecommended } from "@/lib/recommended-service";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Wrapper } from "./wrapper";
import { getFollowedUsers } from "@/lib/follow-service";
import { Following, FollowingSkeleton } from "./following";

export async function Sidebar() {
  const recommendedUsers = await getRecommended();
  const followedUsers = await getFollowedUsers();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={followedUsers}/>
        <Recommended data={recommendedUsers}/>
      </div>
    </Wrapper>
  )
}

export function SidebarSkeleton() {
  return (
    <aside className="fixed lef-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <FollowingSkeleton />
      <ToggleSkeleton />
      <RecommendedSkeleton />
    </aside>
  )
}
