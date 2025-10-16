import { notFound } from 'next/navigation';
import { getPostById, getAllCategories } from '@/lib/data';
import { PostForm } from '@/components/admin/PostForm';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function EditPostPage({ params }: { params: { id: string } }) {
    const post = getPostById(params.id);
    const categories = getAllCategories();

    if (!post) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <AdminHeader 
                title="Edit Post"
                subtitle={`You are currently editing "${post.title}"`}
            />
            <PostForm post={post} categories={categories} />
        </div>
    );
}
