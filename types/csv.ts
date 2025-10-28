// types/csv.ts

export interface CsvColumn {
  id: number;
  name: string;
  type: string;
}

export interface CsvFile {
  id: number;
  name: string;
  description: string;
  file_name: string;
  user_id: number;
  created_at: string;
  columns?: CsvColumn[];
}
