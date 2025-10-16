import { BlogPostCard } from '@/components/BlogPostCard';
import { getAllPosts, getAllCategories } from '@/lib/data';

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">
          Welcome to Teal Canvas
        </h1>
        <p className="text-lg text-muted-foreground">
          Exploring ideas, one post at a time.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => {
          const category = categories.find(c => c.id === post.categoryId);
          return (
            <BlogPostCard key={post.id} post={post} category={category} />
          );
        })}
      </div>
    </div>
  );
}
