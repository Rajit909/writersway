import { getAllCategories } from "@/lib/data";
import { PostForm } from "@/components/admin/PostForm";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function NewPostPage() {
    const categories = getAllCategories();

    return (
        <div className="space-y-6">
            <AdminHeader 
                title="Create New Post"
                subtitle="Fill out the form below to add a new article."
            />
            <PostForm categories={categories} />
        </div>
    );
}
