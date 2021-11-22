export interface IArticle {
  id: number;
  userId: number;
  article: string;
  articleTitle: string;
  createDt: string;
  updateDt: string | null;
  audit: number;
}
