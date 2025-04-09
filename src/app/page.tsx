import { CreateNewTopicForm } from "@/components/topics/createNewTopicForm";
import TopicsList from "@/components/topics/TopicList";
import { Suspense } from "react";

export default function Home() {
    return (
      <div className="grid grid-cols-4 gap-4 p-4 ">
        <div className="col-span-3">
          <h1 className="font-bold text-2xl mb-5">All Topics</h1>
          {/* <PostList fetchData={fetchTopPosts}/> */}
          <Suspense fallback= {"Loading..."}>
            <TopicsList />
          </Suspense>
        </div>
        <div>
          <CreateNewTopicForm />
        </div>
      </div>
      
    );
}
