export interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  isArchived: boolean;
  createdAt: number;
  lastModified: number;
}
