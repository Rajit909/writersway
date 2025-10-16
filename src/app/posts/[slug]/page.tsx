import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, getAllCategories } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { SuggestedArticle } from '@/components/SuggestedArticle';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const allPosts = getAllPosts();

  if (!post) {
    notFound();
  }

  const category = getAllCategories().find(c => c.id === post.categoryId);

  return (
    <article className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
       <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
        <ArrowLeft size={16} />
        Back to all posts
      </Link>
      <header className="mb-8">
        <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-6">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            data-ai-hint={post.imageHint}
          />
        </div>
        
        {category && (
          <Link href={`/category/${category.slug}`}>
            <Badge variant="default" className="mb-4">{category.name}</Badge>
          </Link>
        )}
        <h1 className="text-3xl md:text-5xl font-headline font-bold mb-3">
          {post.title}
        </h1>
        <p className="text-muted-foreground">
          By {post.author} on {post.publishedAt}
        </p>
      </header>

      <div className="prose prose-invert prose-lg max-w-none text-foreground/90 prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground">
        <p>{post.content}</p>
      </div>

      <div className="mt-12 border-t pt-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Written by</p>
              <p className="font-semibold text-foreground">{post.author}</p>
            </div>
            {category && (
              <>
                <div className="h-10 border-l border-border"></div>
                <div>
                  <p className="text-sm text-muted-foreground">Posted in</p>
                  <Link href={`/category/${category.slug}`} className="hover:underline">
                      <Badge variant="outline">{category.name}</Badge>
                  </Link>
                </div>
              </>
            )}
        </div>
      </div>
      
      <SuggestedArticle currentPost={post} allPosts={allPosts} />

    </article>
  );
}
