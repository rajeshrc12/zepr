export interface MessageType {
  id: number;
  content: string;
  type: string; // e.g., "user" | "assistant" | "system" if you use message roles
  chat_id: number;
  created_at: string; // ISO datetime string (e.g. "2025-10-28T15:42:00Z")
}

export interface ChatType {
  id: number;
  name: string;
  csv_id: number;
  user_id: number;
  created_at: string;
  messages: MessageType[]; // optional if you load related messages
}
// types/csv.ts

export interface ColumnType {
  id: number;
  name: string;
  type: string;
}

export interface CsvType {
  id: number;
  name: string;
  description: string;
  file_name: string;
  user_id: number;
  created_at: string;
  columns?: ColumnType[];
}
