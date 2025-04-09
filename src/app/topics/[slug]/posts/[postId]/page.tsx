import CommentCreateForm from "@/components/comments/CommentCreateForm";
import CommentList from "@/components/comments/CommentList";
import PostShow from "@/components/posts/postShow";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

type PostShowPageProps = {
    params : Promise< {slug : string ; postId : string}>
}

const PostShowPage : React.FC<PostShowPageProps>= async({params}) => {
    const {slug,postId} = await params
    return (
      <div className="space-y-3">
        <Link href={`/topics/${slug}`}>
          <Button variant={"link"} className="text-amber-50">
            <ChevronLeft className="text-white w-6 h-6 hover:scale-110 transition-transform duration-200" />
            Back to {slug.toUpperCase()}
          </Button>
        </Link>
        <Suspense fallback={<p> LOADING... </p>}>
          <PostShow postId={postId} />
        </Suspense>
        <CommentCreateForm postId={postId} startOpen />
        <CommentList postId={postId} />
      </div>
    );
};

export default PostShowPage;