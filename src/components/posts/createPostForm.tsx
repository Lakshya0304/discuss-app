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
        <Button
          variant="secondary"
          className="rounded-2xl border border-gray-200"
        >
          New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white shadow-2xl rounded-2xl border border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-300">
            Create a Post
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Write a new post
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="grid gap-4 p-4">
            <div>
              <Label htmlFor="title" className="text-slate-200">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                className="bg-slate-800 text-white border border-slate-600 placeholder:text-slate-400"
              />
            </div>
            {fromState.errors.title && (
              <p className="text-sm text-red-400">{fromState.errors.title}</p>
            )}
            <div>
              <Label htmlFor="content" className="text-slate-200">
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                className="bg-slate-800 text-white border border-slate-600 placeholder:text-slate-400"
              />
            </div>
            {fromState.errors.content && (
              <p className="text-sm text-red-400">{fromState.errors.content}</p>
            )}
            {fromState.errors.formError && (
              <div className="border border-red-800 bg-red-500/30 rounded-md p-3 text-red-200">
                {fromState.errors.formError}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-2/3 mx-auto block text-center bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Post
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePostForm;