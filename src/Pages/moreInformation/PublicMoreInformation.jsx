import { useEffect, useState } from "react";
import { useGetMoreInformationQuery } from "../../Redux/moreInformationApis";

const PublicMoreInformation = () => {
  const { data, isLoading, isError } = useGetMoreInformationQuery();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data?.content) {
      setContent(data.content);
    }
  }, [data]);

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Failed to load more information.
      </div>
    );
  }

  return (
    <div className="px-10 py-10 bg-[#F9FAFB]">
      <div className="w-full px-6 py-8 bg-white rounded-lg">
        <h1 className="text-2xl font-semibold mb-5 text-center">
          More Information
        </h1>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default PublicMoreInformation;
