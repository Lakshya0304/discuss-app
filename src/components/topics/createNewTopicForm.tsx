'use client'
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
import { createTopic } from "@/actions/create-topics";
import { useActionState } from "react";

export function CreateNewTopicForm() {
    const [fromState , action] = useActionState(createTopic , {errors: {}});
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="rounded-2xl border border-gray-200"
        >
          New Topic
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#475569] border border-blue-900 shadow-2xl text-white rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-blue-100 text-xl font-bold">
            Create a Topic
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Write a new topic to start a discussion
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="grid gap-4 p-4">
            <div>
              <Label htmlFor="name" className="text-blue-100">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                className="bg-slate-800 text-white placeholder:text-slate-400 border border-slate-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {fromState.errors.name && (
              <p className="text-sm text-red-400">{fromState.errors.name}</p>
            )}

            <div>
              <Label htmlFor="discription" className="text-blue-100">
                Description
              </Label>
              <Textarea
                id="discription"
                name="discription"
                className="bg-slate-800 text-white placeholder:text-slate-400 border border-slate-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {fromState.errors.discription && (
              <p className="text-sm text-red-400">
                {fromState.errors.discription}
              </p>
            )}

            {fromState.errors.formError && (
              <div className="border border-red-700 bg-red-500/20 text-red-300 rounded-md p-2">
                {fromState.errors.formError}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-2/3 mx-auto block bg-blue-600 hover:bg-blue-500 transition text-white font-semibold shadow-md"
            >
              Create Topic
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

