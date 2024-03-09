import AddBlogForm from "./AddBlogForm";

export const metadata = {
  title: "Add new blog - admin - portfolio",
  description: "This is add new blog page of Saiful Islam portfolio website.",
};

const AddBlog = () => {
  return (
    <section className="rounded border border-gray-700 bg-gray-800 p-4 shadow">
      <h2 className="mb-2 text-xl font-bold">Add new blog</h2>
      <AddBlogForm />
    </section>
  );
};

export default AddBlog;
