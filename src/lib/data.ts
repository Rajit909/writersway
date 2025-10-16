import type { Post, Category } from './types';
import { PlaceHolderImages } from './placeholder-images';

let categories: Category[] = [
  { id: '1', name: 'News', slug: 'news' },
  { id: '2', name: 'Tech', slug: 'tech' },
  { id: '3', name: 'Education', slug: 'education' },
];

let posts: Post[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    slug: 'future-of-web-development',
    content: 'The web is constantly evolving. In this article, we explore the upcoming trends in web development for 2024 and beyond, including the rise of server components, edge computing, and AI-driven development tools. The landscape feels both exciting and a little daunting, but the potential for creating richer user experiences is immense. We are optimistic about what is to come.',
    categoryId: '2',
    imageUrl: PlaceHolderImages[0].imageUrl,
    imageHint: PlaceHolderImages[0].imageHint,
    author: 'Jane Doe',
    publishedAt: '2024-05-15',
  },
  {
    id: '2',
    title: 'Breaking News in the Tech World',
    slug: 'breaking-tech-news',
    content: 'A major breakthrough has just been announced in the field of quantum computing. This could revolutionize everything from medicine to finance. Experts are cautiously optimistic, but the road ahead is long. The announcement has sent shockwaves through the industry.',
    categoryId: '1',
    imageUrl: PlaceHolderImages[1].imageUrl,
    imageHint: PlaceHolderImages[1].imageHint,
    author: 'John Smith',
    publishedAt: '2024-05-12',
  },
  {
    id: '3',
    title: 'The Importance of Lifelong Learning',
    slug: 'lifelong-learning-importance',
    content: 'In an ever-changing world, the ability to learn and adapt is more important than ever. This article explores the benefits of lifelong learning and provides practical tips for staying curious and engaged. Education doesn\'t stop when you leave school; it\'s a journey that lasts a lifetime.',
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
    categoryId: '2',
    imageUrl: PlaceHolderImages[3].imageUrl,
    imageHint: PlaceHolderImages[3].imageHint,
    author: 'Michael Brown',
    publishedAt: '2024-05-08',
  },
  {
    id: '5',
    title: 'Online Courses Revolutionize Education',
    slug: 'online-courses-education',
    content: 'The rise of MOOCs and online learning platforms has made education more accessible than ever. We look at the pros and cons of online learning and how it is shaping the future of education. The flexibility is a huge advantage, but it requires self-discipline.',
    categoryId: '3',
    imageUrl: PlaceHolderImages[4].imageUrl,
    imageHint: PlaceHolderImages[4].imageHint,
    author: 'Sarah Green',
    publishedAt: '2024-05-05',
  },
  {
    id: '6',
    title: 'Latest Updates from the Tech Industry',
    slug: 'latest-tech-updates',
    content: 'This week in tech: a new AI model that can generate video from text, a major acquisition in the gaming industry, and the latest news on the right to repair movement. It is hard to keep up with the rapid pace of innovation.',
    categoryId: '1',
    imageUrl: PlaceHolderImages[5].imageUrl,
    imageHint: PlaceHolderImages[5].imageHint,
    author: 'David Black',
    publishedAt: '2024-05-02',
  },
  {
    id: '7',
    title: 'AI in the Classroom',
    slug: 'ai-in-the-classroom',
    content: 'Artificial intelligence is poised to transform education as we know it. From personalized learning paths to automated grading, we explore the potential benefits and challenges of integrating AI into the classroom. The possibilities are exciting, but ethical considerations are paramount.',
    categoryId: '3',
    imageUrl: PlaceHolderImages[6].imageUrl,
    imageHint: PlaceHolderImages[6].imageHint,
    author: 'Laura Wilson',
    publishedAt: '2024-04-28',
  },
  {
    id: '8',
    title: 'The Rise of Cloud-Native Technologies',
    slug: 'rise-of-cloud-native',
    content: 'Cloud-native is more than just a buzzword; it\'s a fundamental shift in how we build and run applications. This article breaks down the core concepts of cloud-native, including containers, microservices, and Kubernetes. The learning curve is steep, but the benefits in scalability and resilience are undeniable.',
    categoryId: '2',
    imageUrl: PlaceHolderImages[7].imageUrl,
    imageHint: PlaceHolderImages[7].imageHint,
    author: 'Chris Martinez',
    publishedAt: '2024-04-25',
  },
  {
    id: '9',
    title: 'Global Tech Giants Face Scrutiny',
    slug: 'global-tech-giants-scrutiny',
    content: 'Regulators around the world are taking a closer look at the power and influence of major technology companies. We cover the latest in antitrust investigations and data privacy regulations that could reshape the digital landscape. It\'s a complex issue with no easy answers.',
    categoryId: '1',
    imageUrl: PlaceHolderImages[8].imageUrl,
    imageHint: PlaceHolderImages[8].imageHint,
    author: 'Jessica Lee',
    publishedAt: '2024-04-22',
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
  // Also remove posts in this category
  posts = posts.filter(p => p.categoryId !== id);
  return categories.length < initialLength;
};
