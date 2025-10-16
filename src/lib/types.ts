export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  imageUrl: string;
  imageHint: string;
  author: string;
  publishedAt: string;
};
