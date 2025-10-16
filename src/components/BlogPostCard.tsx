import Image from 'next/image';
import Link from 'next/link';
import type { Post, Category } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

type BlogPostCardProps = {
  post: Post;
  category?: Category;
};

export function BlogPostCard({ post, category }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/posts/${post.slug}`} className="group">
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
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
                {category && (
                    <Badge variant="outline" className="text-primary border-primary">{category.name}</Badge>
                )}
                <span className="text-muted-foreground text-sm">{post.publishedAt}</span>
            </div>
            <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
              {post.title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">
            {post.content}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
