"use client";
import { useRouter } from "next/navigation";
import revalidate from "@/lib/revalidate";
import PopOver from "@/components/PopOver";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import Alert from "@/config/Alert.config";
import deleteBlog from "@/lib/actions/blog/deleteBlog";

const Actions = ({ blogId, thumbnail, slug }) => {
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const handleDelete = async () => {
    const { isConfirmed } = await Alert.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (isConfirmed) {
      Alert.fire({
        didOpen: () => {
          Alert.showLoading();
        },
      });
      try {
        await deleteBlog(blogId);
        await edgestore.portfolioImages.delete({
          url: thumbnail,
        });
        Alert.fire({
          icon: "success",
          title: "Blog is deleted!",
        });
      } catch (err) {
        console.error(err);
        Alert.fire({
          icon: "error",
          text: "Something went wrong",
        });
      } finally {
        revalidate("/admin/blog/all_blogs");
      }
    }
  };

  const handleUpdate = () => {
    router.push(`/admin/blog/update/${slug}?blogId=${blogId}`);
  };

  return <PopOver handleDelete={handleDelete} handleUpdate={handleUpdate} />;
};

export default Actions;
