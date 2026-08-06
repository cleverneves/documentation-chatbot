import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import { useChat } from "../hooks/useChat";

export function ChatWindow() {
  const { messages, isLoading, error, sendUserMessage, dismissError } = useChat();

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

      {isLoading && (
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", px: 2, pb: 1 }}
        >
          <CircularProgress size={16} />
          <Typography variant="caption" color="text.secondary">
            Consultando a documentação...
          </Typography>
        </Stack>
      )}

      <Box>
        <ChatInput onSend={sendUserMessage} isLoading={isLoading} />
      </Box>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={dismissError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={dismissError} severity="error" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
