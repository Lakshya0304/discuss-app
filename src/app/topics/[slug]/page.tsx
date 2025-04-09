import CreatePostForm from "@/components/posts/createPostForm";
import PostList from "@/components/posts/postList";
import { Button } from "@/components/ui/button";
import { fetchPostBySlug } from "@/lib/query/post";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type TopicShowPageProps = {
    params : Promise<{slug : string}>
}
const TopicShowPage: React.FC<TopicShowPageProps> = async({params}) => {
    const slug = (await params).slug;

    return (
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
          <Link href={`/`}>
            <Button variant={"link"}>
              <ChevronLeft className="text-white w-6 h-6 hover:scale-110 transition-transform duration-200" />{" "}
              <h1 className="font-bold p-4 text-2xl text-amber-50">{slug}</h1>
            </Button>
          </Link>
          {/* <h1 className="font-bold p-4 text-2xl">{slug}</h1> */}
          <PostList fetchData={() => fetchPostBySlug(slug)} />
        </div>

        <div>
          <CreatePostForm slug={slug} />
        </div>
      </div>
    );
};

export default TopicShowPage;
