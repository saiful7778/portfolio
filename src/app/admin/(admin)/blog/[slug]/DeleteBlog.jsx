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
        const res = await deleteBlog(blogId);
        if (!res.success) {
          Alert.fire({
            icon: "error",
            text: res.message,
          });
          return;
        }
        Alert.fire({
          icon: "success",
          title: "Blog is deleted!",
        });
      } catch (err) {
        Alert.fire({
          icon: "error",
          text: err,
        });
      }
      router.push("/admin/blog/all_blogs");
      revalidate("/admin/blog/all_blogs");
    }
  };

  return (
    <Button onClick={handleDelete} variant="cancel">
      Delete
    </Button>
  );
};

export default DeleteBlog;
