"use client";

import { useState } from 'react';
import Link from 'next/link';
import type { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { suggestArticleBasedOnSentiment, type SuggestedArticleBasedOnSentimentOutput } from '@/ai/flows/suggested-article-based-on-sentiment';

type SuggestedArticleProps = {
  currentPost: Post;
  allPosts: Post[];
};

export function SuggestedArticle({ currentPost, allPosts }: SuggestedArticleProps) {
  const [suggestion, setSuggestion] = useState<SuggestedArticleBasedOnSentimentOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestion = async () => {
    setLoading(true);
    setError(null);
    try {
      const availableArticles = allPosts
        .filter(p => p.id !== currentPost.id)
        .map(p => p.title);
      
      const result = await suggestArticleBasedOnSentiment({
        articleContent: currentPost.content,
        availableArticles: availableArticles,
      });
      setSuggestion(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate suggestion. Please try again.');
    }
    setLoading(false);
  };

  const suggestedPost = suggestion ? allPosts.find(p => p.title === suggestion.suggestedArticle) : null;

  return (
    <div className="mt-12">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Wand2 className="text-primary"/>
            Explore Next
          </CardTitle>
          <CardDescription>
            Let AI suggest another article you might like based on this one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!suggestion && (
            <Button onClick={handleSuggestion} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                'Suggest an Article'
              )}
            </Button>
          )}

          {error && <p className="text-destructive text-sm">{error}</p>}

          {suggestion && suggestedPost && (
            <div className="space-y-4">
                <p className="text-sm italic text-muted-foreground">"{suggestion.reasoning}"</p>
                <Link href={`/posts/${suggestedPost.slug}`}>
                    <Card className="bg-background hover:bg-accent/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="text-lg font-headline">{suggestedPost.title}</CardTitle>
                            <CardDescription>{suggestedPost.author} &middot; {suggestedPost.publishedAt}</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
