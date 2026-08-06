import Paper from "@mui/material/Paper";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import { useChat } from "../hooks/useChat";

export function ChatWindow() {
  const { messages, isLoading, sendUserMessage } = useChat();

  return (
    <Paper
      elevation={1}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <MessageList messages={messages} />
      <ChatInput onSend={sendUserMessage} isLoading={isLoading} />
    </Paper>
  );
}
