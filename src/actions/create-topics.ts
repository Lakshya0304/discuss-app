'use server'
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {z} from "zod";

const createTopicSchema = z.object({
    name : z.string() . min(3),
    discription: z.string() .min(10)
})

type CreateTopicFormState = {
    errors : {
        name ?: string[],
        discription ?: string[],
        formError ?: string[]
    }
}

export const createTopic = async (prevState : CreateTopicFormState, formData : FormData) : Promise<CreateTopicFormState> => {

    // const name = formData.get('name');
    // console.log("🚀 ~ createTopic ~ name:", name)
    // const discription = formData.get('discription')
    // console.log("🚀 ~ createTopic ~ discription:", discription)

    const result = createTopicSchema.safeParse({
        name :formData.get('name'),
        discription : formData.get('discription')
    })

    if(!result.success){
        return{
            errors : result.error.flatten().fieldErrors
        }
    }

    const session = await auth();
    if(!session || !session.user){
        return{
            errors: {
                formError : ["You must be logged In"]
            }
        }
    }

    let topic : Topic;
    try {
        topic = await prisma.topic.create({
                    data:{
                        slug:result.data.name,
                        discription : result.data.discription
                    }
                })
        console.log("🚀 ~ createTopic ~ topic:", topic)
    } catch (error) {
        if(error instanceof Error){
            return{
                errors: {
                    formError : [error.message]
                }
            }   
        }else{
            return{
                errors: {
                    formError : ["Something went wrong"]
                }
            }
        }
    }

    revalidatePath("/")
    redirect(`/topics/${topic.slug}`)
}