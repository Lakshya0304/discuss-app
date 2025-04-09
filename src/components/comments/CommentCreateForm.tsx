
'use client'
import React, { useActionState, useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { createComment } from '@/actions/create-comments'
import { Loader2 } from 'lucide-react'

type CommentCreateFormProps = {
    postId : string,
    parentId ?: string,
    startOpen ?: boolean 
}

const CommentCreateForm : React.FC<CommentCreateFormProps> = ({postId,parentId,startOpen}) => {
    const [open, setOpen] = useState(startOpen);
    const [formState, action , isPending] = useActionState( createComment.bind(null , {postId, parentId}), { errors: {} });
    
  return (
    <div>
      <Button className='text-white' size={"sm"} variant={"link"} onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && (
        <form action={action} className="space-y-2">
          <Textarea
            name="content"
            placeholder="Write your comment..."
            className="bg-gray-100 text-black focus-visible:ring-0 my-2"
          />
          {formState.errors.content && (
            <p className="text-red-600 text-sm">{formState.errors.content}</p>
          )}
          {formState.errors.formError && (
            <div className="border-red-800 rounded-sm text-red-200 text-sm">
              {formState.errors.formError}
            </div>
          )}

          <Button disabled={isPending} variant={"secondary"} size={"sm"}>
            {isPending ? (
              <>
                <Loader2 />
                Please Wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}

export default CommentCreateForm
