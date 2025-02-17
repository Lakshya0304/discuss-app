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
        <Link key={post.id} href={`/topics/${post.topic.slug}/posts/${post.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="flex items-center justify-between">
                <h1>By {post.user.name}</h1>
                <h1> {post._count.comments} comments</h1>
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default PostList
