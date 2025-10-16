import { getAllCategories } from "@/lib/data";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { CategoryClient } from "@/components/admin/CategoryClient";

export default function AdminCategoriesPage() {
    const categories = getAllCategories();

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Categories"
                subtitle="Organize your posts by adding and managing categories."
            />
            <CategoryClient initialCategories={categories} />
        </div>
    );
}
