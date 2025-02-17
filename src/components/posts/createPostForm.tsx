"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { createPost } from "@/actions/create-posts";
import { useActionState } from "react";

type CreatePostFormProps = {
    slug : string
}

const CreatePostForm : React.FC<CreatePostFormProps>  = ({slug}) =>{
  const [fromState, action] = useActionState(createPost.bind(null , slug), { errors: {} });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
          <DialogDescription>
                Write a new post
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="grid gap-4 p-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" />
            </div>
            {fromState.errors.title && (
              <p className="text-sm text-red-500">{fromState.errors.title}</p>
            )}
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" name="content" />
            </div>
            {fromState.errors.content && (
              <p className="text-sm text-red-500">
                {fromState.errors.content}
              </p>
            )}
            {fromState.errors.formError && (
              <div className="border border-red-800 bg-red-300 rounded-sm p-2">
                {fromState.errors.formError}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="w-2/3 mx-auto block text-center">Create Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePostForm;