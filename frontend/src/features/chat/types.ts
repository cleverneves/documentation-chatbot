export type MessageRole = "user" | "assistant";

export interface Source {
  fileName: string;
  excerpt: string;
  score?: number | null;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  sources?: Source[];
}
