import type { Post, Category } from "@/lib/types";
import { createPost, editPost } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from 'next/link';

type PostFormProps = {
  post?: Post;
  categories: Category[];
};

export function PostForm({ post, categories }: PostFormProps) {
  const action = post ? editPost.bind(null, post.id) : createPost;

  return (
    <form action={action}>
      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={post?.title} placeholder="The Future of AI" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" defaultValue={post?.content} placeholder="Write your article here..." required minLength={10} rows={10} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <Select name="categoryId" defaultValue={post?.categoryId} required>
                    <SelectTrigger id="categoryId">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                            {category.name}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" defaultValue={post?.author || 'Admin'} placeholder="John Doe" required />
              </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image</Label>
             <Select name="imageUrl" defaultValue={post?.imageUrl}>
                <SelectTrigger id="imageUrl">
                    <SelectValue placeholder="Select an image" />
                </SelectTrigger>
                <SelectContent>
                    {PlaceHolderImages.map((image) => (
                    <SelectItem key={image.id} value={image.imageUrl}>
                        {image.description}
                    </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <input type="hidden" name="imageHint" value="abstract technology" />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
            <Link href="/admin">
                <Button variant="ghost">Cancel</Button>
            </Link>
          <Button type="submit">{post ? 'Save Changes' : 'Create Post'}</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
