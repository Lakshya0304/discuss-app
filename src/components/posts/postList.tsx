import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { postWithData } from '@/lib/query/post';
import Link from 'next/link';

type PostListProps = {
    fetchData: ()=> Promise<postWithData[]>;
};

const PostList : React.FC<PostListProps> = async({fetchData}) => {
    const posts = await fetchData();
    // console.log("🚀 ~ constPostList:React.FC<PostListProps>=async ~ posts:", posts)
  return (
    <div className=" flex flex-col gap-2">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/topics/${post.topic.slug}/posts/${post.id}`}
        >
          <Card className="bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border border-gray-200 m-5">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 tracking-tight">
                {post.title}
              </CardTitle>
              <CardDescription className="flex items-center justify-between text-sm text-slate-600 mt-2">
                <span className="flex items-center gap-1 text-blue-700 font-medium">
                  ✍️ By {post.user.name}
                </span>
                <span className="flex items-center gap-1 text-pink-600 font-medium">
                  💬 {post._count.comments} comments
                </span>
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default PostList
