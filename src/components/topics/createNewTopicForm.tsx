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
        <Button variant="outline">New Topic</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
            <DialogTitle>Create a Topic</DialogTitle>
            <DialogDescription>
                Write a new topic to start a discussion
            </DialogDescription>
        </DialogHeader>
        <form action={action}>
            <div className="grid gap-4 p-4">
                <div>
                    <Label htmlFor="name" >Name</Label>
                    <Input id="name" name="name"/>
                </div>
                {fromState.errors.name && <p className="text-sm text-red-500">{fromState.errors.name}</p>}
                <div >
                    <Label htmlFor="discription" >Discription</Label>
                    <Textarea id="discription" name="discription"/>
                </div>
                {fromState.errors.discription && <p className="text-sm text-red-500">{fromState.errors.discription}</p>}
                {fromState.errors.formError && <div className="border border-red-800 bg-red-300 rounded-sm p-2">{fromState.errors.formError}</div>}
            </div>
            <DialogFooter >
                <Button type="submit" className="w-2/3 mx-auto block text-center"> Create Topic </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

