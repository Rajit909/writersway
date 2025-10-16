"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addPost, updatePost, deletePost as deletePostData, addCategory, deleteCategory as deleteCategoryData } from "./data";

const PostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  content: z.string().min(10, "Content must be at least 10 characters."),
  categoryId: z.string().min(1, "Please select a category."),
  imageUrl: z.string().url("Please enter a valid image URL."),
  imageHint: z.string().optional(),
  author: z.string().min(2, "Author name must be at least 2 characters."),
});

export async function createPost(formData: FormData) {
  const validatedFields = PostSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    // This is a simple error handling. In a real app, you'd want to
    // return the errors to the form.
    console.error(validatedFields.error);
    throw new Error("Validation failed.");
  }
  
  const { title, content, categoryId, imageUrl, imageHint, author } = validatedFields.data;
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  addPost({
    title,
    slug,
    content,
    categoryId,
    imageUrl,
    imageHint: imageHint || 'abstract',
    author,
    publishedAt: new Date().toISOString().split('T')[0],
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function editPost(id: string, formData: FormData) {
    const validatedFields = PostSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        console.error(validatedFields.error);
        throw new Error("Validation failed.");
    }

    const { title, ...rest } = validatedFields.data;
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    updatePost(id, { title, slug, ...rest });

    revalidatePath("/");
    revalidatePath(`/posts/${slug}`);
    revalidatePath("/admin");
    redirect("/admin");
}

export async function deletePost(id: string) {
    deletePostData(id);
    revalidatePath("/");
    revalidatePath("/admin");
}

const CategorySchema = z.object({
    name: z.string().min(2, "Category name must be at least 2 characters."),
});

export async function createCategory(formData: FormData) {
    const validatedFields = CategorySchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        console.error(validatedFields.error);
        return { error: "Validation failed." };
    }

    const { name } = validatedFields.data;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    addCategory({ name, slug });
    revalidatePath("/admin/categories");

    return { success: "Category created." };
}

export async function deleteCategory(id: string) {
    deleteCategoryData(id);
    revalidatePath("/admin/categories");
}
