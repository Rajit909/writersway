import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/data';
import { deletePost } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AdminHeader } from '@/components/admin/AdminHeader';

function DeletePostButton({ id }: { id: string }) {
  const deletePostWithId = deletePost.bind(null, id);
  return (
    <form action={deletePostWithId}>
      <button type="submit" className="w-full text-left">
        Delete
      </button>
    </form>
  );
}

export default function AdminPostsPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const categoryMap = new Map(categories.map(c => [c.id, c.name]));

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Blog Posts"
        subtitle="Manage all your articles here."
      >
        <Link href="/admin/posts/new">
          <Button>
            <PlusCircle size={18} />
            New Post
          </Button>
        </Link>
      </AdminHeader>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden lg:table-cell">Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">{categoryMap.get(post.categoryId) || 'N/A'}</Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{post.publishedAt}</TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" asChild>
                        <DeletePostButton id={post.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
       {posts.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
              No posts found. Get started by creating one.
          </div>
      )}
    </div>
  );
}
