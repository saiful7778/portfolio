"use client";
import Button from "@/components/utilities/Button";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import deleteBlog from "@/lib/actions/blog/deleteBlog";
import Alert from "@/config/Alert.config";
import revalidate from "@/lib/revalidate";
import { useRouter } from "next/navigation";

const DeleteBlog = ({ blogId, thumbnail }) => {
  const router = useRouter();
  const { edgestore } = useEdgeStore();

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
        revalidate("/admin/blog/all_blogs");
        router.push("/admin/blog/all_blogs");
      } catch (err) {
        console.error(err);
        Alert.fire({
          icon: "error",
          text: "Something went wrong",
        });
      }
    }
  };

  return (
    <Button onClick={handleDelete} variant="cancel">
      Delete
    </Button>
  );
};

export default DeleteBlog;
