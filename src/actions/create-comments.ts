'use server'
import {z} from "zod"
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";

const CreateCommentSchema = z.object({
    content : z.string().min(3)
})


type CreateCommentFormState = {
  errors: {
    content?: string[];
    formError?: string[];
  };
};

export const createComment = async(
    {postId , parentId} : {postId : string , parentId ?: string}, 
    prevState : CreateCommentFormState ,
    formData : FormData): 
    Promise<CreateCommentFormState> => 
{
    const result = CreateCommentSchema.safeParse({
        content  : formData.get('content')
    })

    if(!result.success){
        return {
          errors: result.error.flatten().fieldErrors,
        }
    }


    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
              formError: ["You must be logged In"],
            },
        };
    }

    try {
        const comment = await prisma.comment.create({
            data:{
                content:result.data.content,
                postId: postId,
                userId:session.user.id,
                parentId : parentId
            }
        })
        console.log("🚀 ~ comment:", comment)
        
    } catch (error : unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formError: [error.message],
                },
            };
        } else {
            return {
                errors: {
                    formError: ["Failed to create post"],
                },
            };
        }
    }

    const topic = await prisma.topic.findFirst({
        where: {posts : {some : {id:postId}}}
    })
    console.log("🚀 ~ topic:", topic)

    if(!topic){
        return {
            errors: {
                formError: ["Failed to revalidate Path"],
            },
        };
    }

    revalidatePath(`/topics/${topic.slug}/posts/${postId}`)
    return {
        errors : {}
    }
}

