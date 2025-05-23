import { fetchCommentByPostId } from '@/lib/query/comment'
import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import CommentCreateForm from './CommentCreateForm'

type CommentShowProps = {
    postId : string,
    commentId : string
}

const CommentShow : React.FC<CommentShowProps> = async({postId , commentId}) => {
    const comments = await fetchCommentByPostId(postId);

    const comment = comments.find((c) => c.id === commentId)
    if(!comment) return null;

    const children = comments.filter((c) => c.parentId == commentId);

    return (
      <div className='border rounded-sm m-4 p-4'>
        <div className='flex gap-3'>
          <Avatar>
            <AvatarImage src={comment.user.image || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <p className="text-gray-500 text-sm font-medium">
              {comment.user.name}
            </p>
            <p className="text-white-800">{comment.content}</p>
            <CommentCreateForm postId={comment.postId} parentId={comment.id} />
          </div>
        </div>
        {children.map((comment) => (
          <CommentShow
            key={comment.id}
            postId={comment.postId}
            commentId={comment.id}
          />
        ))}
      </div>
    );
}

export default CommentShow
