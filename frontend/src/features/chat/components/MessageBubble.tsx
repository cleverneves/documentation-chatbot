import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { SourceReferences } from "./SourceReferences";
import type { Message } from "../types";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{ width: "100%", justifyContent: isUser ? "flex-end" : "flex-start" }}
    >
      {!isUser && (
        <Avatar sx={{ bgcolor: "secondary.main", width: 32, height: 32 }}>
          <SmartToyIcon fontSize="small" />
        </Avatar>
      )}

      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          maxWidth: "75%",
          bgcolor: isUser ? "primary.main" : "grey.100",
          color: isUser ? "primary.contrastText" : "text.primary",
          borderRadius: 2,
        }}
      >
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
          {message.content}
        </Typography>
        {!isUser && message.sources && message.sources.length > 0 && (
          <SourceReferences sources={message.sources} />
        )}
      </Paper>

      {isUser && (
        <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
          <PersonIcon fontSize="small" />
        </Avatar>
      )}
    </Stack>
  );
}
