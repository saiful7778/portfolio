"use client";
import Button from "@/components/utilities/Button";
import deleteBlog from "@/lib/actions/deleteBlog";
import Alert from "@/lib/config/Alert.config";
import revalidate from "@/lib/revalidate";
import { useRouter } from "next/navigation";

const DeleteBlog = ({ blogId }) => {
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
          text: err,
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
