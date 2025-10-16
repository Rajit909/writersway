import Image from 'next/image';
import Link from 'next/link';
import type { Post, Category } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

type BlogPostCardProps = {
  post: Post;
  category?: Category;
  isFeatured?: boolean;
};

export function BlogPostCard({ post, category, isFeatured = false }: BlogPostCardProps) {
  if (isFeatured) {
    return (
      <Card className="overflow-hidden md:grid md:grid-cols-2 border-border/60 hover:border-primary/50 transition-all duration-300 group bg-secondary/20">
        <div className="relative h-64 md:h-full w-full">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={post.imageHint}
              priority
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
            <CardHeader className="p-0 mb-4">
                {category && (
                    <Badge variant="default" className="mb-2 w-fit">{category.name}</Badge>
                )}
                <CardTitle className="font-headline text-3xl md:text-4xl">
                   <Link href={`/posts/${post.slug}`} className="hover:underline">{post.title}</Link>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mb-6">
                <CardDescription className="line-clamp-3 text-base">
                    {post.content}
                </CardDescription>
            </CardContent>
            <Link href={`/posts/${post.slug}`} className="flex items-center gap-2 font-semibold text-primary group-hover:underline">
                Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-primary/10 hover:shadow-lg hover:-translate-y-1 bg-secondary/30 border-border/30 hover:border-primary/30">
      <Link href={`/posts/${post.slug}`} className="group flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={post.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex flex-col flex-grow">
            <div className="mb-2">
                {category && (
                    <Badge variant="outline">{category.name}</Badge>
                )}
            </div>
            <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors flex-grow">
              {post.title}
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-4">
                {post.author} &middot; {post.publishedAt}
            </p>
        </CardContent>
      </Link>
    </Card>
  );
}
