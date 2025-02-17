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
              {/* <div>
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div> */}

              {/* <div className="p-2 border rounded shadow">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-semibold">{topic.slug}</h3>
                    <p className="text-gray-600">{topic.discription}</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  {topic.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div> */}

              <div className="p-4 border rounded-2xl shadow-lg bg-white my-4">
                <div className="flex justify-between items-center gap-6">
                  {/* Left Section: Avatar + Content */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage />
                      <AvatarFallback className="bg-gray-300 text-gray-700">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {topic.slug}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {topic.discription}
                      </p>
                    </div>
                  </div>

                  {/* Right Section: Date */}
                  <p className="text-gray-500 text-xs font-medium">
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
