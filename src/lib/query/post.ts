import { Prisma, type Post } from "@prisma/client"
import { prisma } from ".."

export type postWithData = Post & {
    topic : {slug : string}
    _count : {comments : number}
    user : {name : string | null }
}

export const fetchPostBySlug = async( slug : string) : Promise<postWithData[]> => {
    return await prisma.post.findMany({
      where: {
        topic: { slug },
      },
      include: {
        topic: { select: { slug: true } },
        _count: { select: { comments: true } },
        user: { select: { name: true } },
      },
    });
}

export const fetchTopPosts = async (): Promise<postWithData[]> => {
  return prisma.post.findMany({
    orderBy: [
      {
        comments: { _count: "desc" },
      },
    ],
    include: {
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
      user: { select: { name: true } },
    },
    take: 10,
  });
};


export const fetchPostBySearch = async (term: string): Promise<postWithData[]> => {
  return prisma.post.findMany({
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
    include: {
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
      user: { select: { name: true } },
    },
  });
};