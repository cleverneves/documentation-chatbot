import { useState } from "react";
import type { KeyboardEvent } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

interface ChatInputProps {
  onSend: (question: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) {
      return;
    }
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderTop: "1px solid",
        borderColor: "divider",
        borderRadius: 0,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Digite sua pergunta sobre a documentação..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          size="small"
        />
      </Box>
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={isLoading || !value.trim()}
        aria-label="Enviar pergunta"
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
