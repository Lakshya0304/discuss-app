import { prisma } from ".."
import { cache } from "react";


export const fetchAllTopics = cache( async ()=>{
    const topics = await prisma.topic.findMany({
      select: {
        id: true,
        slug: true,
        discription: true,
        createdAt: true,
      }
    });
    // console.log("🚀 ~ fetchTopicsBySlug ~ topics:", topics)
    return topics;
})