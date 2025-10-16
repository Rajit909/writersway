'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function NewsletterForm() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    
    // In a real app, you'd handle form submission here (e.g., API call)
    console.log('Newsletter subscription for:', email);

    toast({
      title: "Subscribed!",
      description: "Thanks for joining our newsletter.",
    });
    
    (event.target as HTMLFormElement).reset();
  };

  return (
    <Card className="bg-secondary/30 border-border/30 py-4">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit mb-2">
            <Mail className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="font-headline text-2xl">Subscribe to our Newsletter</CardTitle>
        <CardDescription>Get the latest articles and updates delivered to your inbox.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input 
            type="email" 
            name="email"
            placeholder="Enter your email" 
            required 
            className="flex-grow text-base"
          />
          <Button type="submit" size="lg">Subscribe</Button>
        </form>
      </CardContent>
    </Card>
  );
}
