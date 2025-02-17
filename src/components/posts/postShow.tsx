import { prisma } from '@/lib'
import React from 'react'

type PostShowProps = {
    postId : string
}

const PostShow : React.FC<PostShowProps> = async({postId}) => {
    const post = await prisma.post.findFirst({
        where : {
            id : postId
        }
    })
  return (
    <div>
        <h1 className='font-bold my-2 text-2xl'>{post?.title.toUpperCase()}</h1>
        <p className='border rounded-md p-4 h-auto'>{post?.content} </p>
    </div>
  )
}

export default PostShow
