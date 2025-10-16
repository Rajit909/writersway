"use client";

import { useRef, useTransition } from 'react';
import { createCategory, deleteCategory } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import type { Category } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

function DeleteCategoryButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      disabled={isPending}
      onClick={() => startTransition(async () => {
        await deleteCategory(id);
        toast({ title: "Category deleted" });
      })}
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-destructive" />}
    </Button>
  );
}

export function CategoryClient({ initialCategories }: { initialCategories: Category[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const handleCreateCategory = async (formData: FormData) => {
    const result = await createCategory(formData);
    if(result?.success) {
      toast({ title: result.success });
      formRef.current?.reset();
    }
    if (result?.error) {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <h3 className="text-lg font-medium mb-4 font-headline">Add New Category</h3>
        <form ref={formRef} action={handleCreateCategory} className="space-y-4">
          <Input name="name" placeholder="e.g., 'Productivity'" required />
          <Button type="submit" className="w-full">
            <PlusCircle size={18} />
            Add Category
          </Button>
        </form>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-right">
                      <DeleteCategoryButton id={category.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {initialCategories.length === 0 && (
                <div className="text-center p-8 text-muted-foreground">
                    No categories found.
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
