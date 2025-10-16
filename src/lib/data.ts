import type { Post, Category } from './types';
import { PlaceHolderImages } from './placeholder-images';

let categories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology' },
  { id: '2', name: 'Productivity', slug: 'productivity' },
  { id: '3', name: 'Design', slug: 'design' },
];

let posts: Post[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    slug: 'future-of-web-development',
    content: 'The web is constantly evolving. In this article, we explore the upcoming trends in web development for 2024 and beyond, including the rise of server components, edge computing, and AI-driven development tools. The landscape feels both exciting and a little daunting, but the potential for creating richer user experiences is immense. We are optimistic about what is to come.',
    categoryId: '1',
    imageUrl: PlaceHolderImages[0].imageUrl,
    imageHint: PlaceHolderImages[0].imageHint,
    author: 'Jane Doe',
    publishedAt: '2024-05-15',
  },
  {
    id: '2',
    title: 'Mastering Productivity: 5 Essential Tips',
    slug: 'mastering-productivity',
    content: 'In today\'s fast-paced world, being productive is key. This post outlines five simple yet powerful strategies to boost your productivity. From the Pomodoro Technique to the Two-Minute Rule, these tips will help you manage your time effectively and achieve your goals. It\'s a struggle for everyone, and sometimes it feels like you are losing the battle against distraction. These feelings are normal, but with discipline, you can overcome them.',
    categoryId: '2',
    imageUrl: PlaceHolderImages[1].imageUrl,
    imageHint: PlaceHolderImages[1].imageHint,
    author: 'John Smith',
    publishedAt: '2024-05-12',
  },
  {
    id: '3',
    title: 'Minimalist Design Principles',
    slug: 'minimalist-design-principles',
    content: 'Minimalism is more than just an aesthetic; it\'s a design philosophy. We delve into the core principles of minimalist design, such as "less is more," use of white space, and focusing on typography. See how these principles can create clean, beautiful, and user-friendly interfaces. It brings a sense of calm and clarity to the digital world.',
    categoryId: '3',
    imageUrl: PlaceHolderImages[2].imageUrl,
    imageHint: PlaceHolderImages[2].imageHint,
    author: 'Emily White',
    publishedAt: '2024-05-10',
  },
  {
    id: '4',
    title: 'Getting Started with Next.js 14',
    slug: 'getting-started-with-nextjs-14',
    content: 'Next.js continues to dominate the React framework landscape. This guide provides a step-by-step walkthrough for setting up a new project with Next.js 14, covering the App Router, Server Actions, and styling with Tailwind CSS. The new features can be overwhelming, and the documentation is sometimes lacking, which creates a frustrating learning experience for newcomers. We hope this guide helps.',
    categoryId: '1',
    imageUrl: PlaceHolderImages[3].imageUrl,
    imageHint: PlaceHolderImages[3].imageHint,
    author: 'Michael Brown',
    publishedAt: '2024-05-08',
  },
  {
    id: '5',
    title: 'The Art of Digital Note-Taking',
    slug: 'art-of-digital-note-taking',
    content: 'Transitioning from paper to digital notes? This article compares popular note-taking apps and methodologies to help you find the perfect system. A well-organized digital notebook can be a powerful tool for learning and creativity. The feeling of having all your thoughts organized is incredibly satisfying.',
    categoryId: '2',
    imageUrl: PlaceHolderImages[4].imageUrl,
    imageHint: PlaceHolderImages[4].imageHint,
    author: 'Sarah Green',
    publishedAt: '2024-05-05',
  },
  {
    id: '6',
    title: 'UI vs. UX: A Clear Distinction',
    slug: 'ui-vs-ux-distinction',
    content: 'The terms UI and UX are often used interchangeably, but they represent different aspects of design. We break down the roles and responsibilities of UI and UX designers to clarify the confusion. Understanding this difference is crucial for building successful products. It’s a wonderful collaboration when both work in harmony.',
    categoryId: '3',
    imageUrl: PlaceHolderImages[5].imageUrl,
    imageHint: PlaceHolderImages[5].imageHint,
    author: 'David Black',
    publishedAt: '2024-05-02',
  },
];

// Public API
export const getAllPosts = () => posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
export const getPostBySlug = (slug: string) => posts.find(p => p.slug === slug);
export const getPostsByCategory = (slug: string) => {
  const category = categories.find(c => c.slug === slug);
  if (!category) return [];
  return posts.filter(p => p.categoryId === category.id);
};

export const getAllCategories = () => categories;
export const getCategoryBySlug = (slug: string) => categories.find(c => c.slug === slug);

// Admin "API"
export const getPostById = (id: string) => posts.find(p => p.id === id);

export const addPost = (post: Omit<Post, 'id'>) => {
  const newPost = { ...post, id: Date.now().toString() };
  posts = [newPost, ...posts];
  return newPost;
};

export const updatePost = (id: string, postData: Partial<Post>) => {
  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex > -1) {
    posts[postIndex] = { ...posts[postIndex], ...postData };
    return posts[postIndex];
  }
  return null;
};

export const deletePost = (id: string) => {
  const initialLength = posts.length;
  posts = posts.filter(p => p.id !== id);
  return posts.length < initialLength;
};

export const addCategory = (category: Omit<Category, 'id'>) => {
  const newCategory = { ...category, id: Date.now().toString() };
  categories = [...categories, newCategory];
  return newCategory;
};

export const deleteCategory = (id: string) => {
  const initialLength = categories.length;
  categories = categories.filter(c => c.id !== id);
  return categories.length < initialLength;
};
