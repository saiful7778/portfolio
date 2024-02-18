import BlogItem from "@/components/BlogItem";
import EmptyData from "@/components/EmptyData";
import ErrorDataShow from "@/components/ErrorDataShow";
import getBlogs from "@/lib/DB/getBlogs";

const Showcase = async () => {
  const res = await getBlogs();

  if (!res.success) {
    return <ErrorDataShow error={res?.message} />;
  }

  const { data: blogs } = res;

  if (blogs.length < 1) {
    return <EmptyData />;
  }

  const allblog = [];
  for (let x of blogs) {
    if (x.status === "published") {
      allblog.push(x);
    }
  }
  const renderAllblogs = allblog.map((blog, idx) => {
    if (blog.status === "published") {
      return <BlogItem key={"blog" + idx} blogData={blog} />;
    }
  });

  if (renderAllblogs.length < 1) {
    return <EmptyData />;
  }

  return (
    <div className="mx-auto mb-16 grid w-4/5 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {renderAllblogs}
    </div>
  );
};

export default Showcase;
