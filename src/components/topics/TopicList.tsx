import { fetchAllTopics } from "@/lib/query/topic";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const TopicsList = async () => {
  const topics = await fetchAllTopics();

  return (
    <div className="p-4">
      <div>
        <ul className="space-y-2">
          {topics.map((topic) => (
            <Link key={topic.id} href={`/topics/${topic.slug}`}>
              <div className="p-4 border rounded-2xl shadow-xl bg-gradient-to-br from-[#e0f7fa] via-[#f1f8ff] to-[#e0f2f1] my-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl animate-fadeIn">
                <div className="flex justify-between items-center gap-6">
                  {/* Left Section: Avatar + Content */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 shadow-md">
                      <AvatarImage />
                      <AvatarFallback className="bg-blue-200 text-blue-900 font-semibold">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg text-slate-800 tracking-tight">
                        {topic.slug}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {topic.discription}
                      </p>
                    </div>
                  </div>

                  {/* Right Section: Date */}
                  <p className="text-gray-600 text-xs font-medium whitespace-nowrap">
                    {new Date(topic.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TopicsList;
