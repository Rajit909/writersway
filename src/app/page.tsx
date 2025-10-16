import Link from 'next/link';
import { BlogPostCard } from '@/components/BlogPostCard';
import { getAllPosts, getAllCategories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { NewsletterForm } from '@/components/NewsletterForm';

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1, 7);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {featuredPost && (
        <div className="mb-12">
          <BlogPostCard post={featuredPost} category={categories.find(c => c.id === featuredPost.categoryId)} isFeatured />
        </div>
      )}

      {otherPosts.length > 0 && (
        <div className="mb-12">
           <h2 className="text-3xl font-headline font-bold mb-8 text-center">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => {
              const category = categories.find(c => c.id === post.categoryId);
              return (
                <BlogPostCard key={post.id} post={post} category={category} />
              );
            })}
          </div>
        </div>
      )}
      
      <div className="mb-16 mt-20">
        <NewsletterForm />
      </div>

      <div>
        <h2 className="text-3xl font-headline font-bold mb-8 text-center">
          Explore by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`} passHref>
               <Button variant="outline" size="lg">{category.name}</Button>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
