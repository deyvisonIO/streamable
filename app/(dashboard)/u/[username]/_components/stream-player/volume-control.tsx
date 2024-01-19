import { Volume1, Volume2, VolumeX } from "lucide-react"

import { Hint } from "@/components/ui/hint"
import { Slider } from "@/components/ui/slider"
import { Jua } from "next/font/google";


interface volumeControlProps {
  onToggle: () => void,
  onChange: (value: number) => void,
  value: number,
}

export function VolumeControl({value, onToggle, onChange}: volumeControlProps) {
  const isMuted = value === 0;
  const isAboveHalf = value > 0;
  let Icon = Volume1;
  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2
  }

  const label = isMuted ? "Unmute" : "Mute";
  const handleChange = (value: number[]) => {
    onChange(value[0])
  }
  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button onClick={onToggle} className="text-white hover:bg-white/10 p-1.5 rounded-lg">
          <Icon className="h-6 w-6" />
        </button>
      </Hint>
      <Slider className="w-32 cursor-pointer" onValueChange={handleChange} value={[value]} max={100} step={1} />
    </div>
  )
}
