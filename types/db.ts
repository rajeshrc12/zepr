export interface ChartConfigType {
  type: string;
  x_axis: string;
  y_axis: string;
}

export interface MessageType {
  id: number;
  content: string;
  sql: string;
  table: [];
  chart: ChartConfigType;
  summary: string;
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
  csv: CsvType;
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

export interface ChartType {
  id: number;
  name: string;
  sql: string;
  table: [];
  config: ChartConfigType;
  summary: string;
  user_id: string;
  created_at: string; // ISO datetime string (e.g. "2025-10-28T15:42:00Z")
}
