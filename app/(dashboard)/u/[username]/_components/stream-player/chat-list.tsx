import { ReceivedChatMessage } from "@livekit/components-react"
import { ChatMessage } from "./chat-message"

interface chatListProps {
  messages: ReceivedChatMessage[]
  isHidden: boolean,
}

export function ChatList({ messages, isHidden }:chatListProps) {
  if(isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is disabled" : "Welcome to the Chat"}
        </p>

      </div>
    )
  }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message) => (
        <ChatMessage
          key={message.timestamp}
          data={message}
        />
      ))}
    </div>
  )
}
