import PostList from "@/components/posts/postList";
import { CreateNewTopicForm } from "@/components/topics/createNewTopicForm";
import { fetchTopPosts } from "@/lib/query/post";
import Link from "next/link";


export default function Home() {
    return (
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
            <h1 className="font-bold text-2xl mb-5">Top post</h1>
            <PostList fetchData={fetchTopPosts}/>
        </div>
        <div>
            <CreateNewTopicForm />
        </div>
      </div>
    );
}
