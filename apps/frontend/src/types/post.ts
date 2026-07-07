export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  readTime: number;
  createdAt: string;
}
