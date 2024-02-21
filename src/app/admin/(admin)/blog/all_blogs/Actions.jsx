"use client";
import { useRouter } from "next/navigation";
import revalidate from "@/lib/revalidate";
import Alert from "@/lib/config/Alert.config";
import deleteBlog from "@/lib/actions/deleteBlog";
import PopOver from "@/components/PopOver";

const Actions = ({ blogId, slug }) => {
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
      revalidate("/admin/blog/all_blogs");
    }
  };

  const handleUpdate = () => {
    router.push(`/admin/blog/update/${slug}?blogId=${blogId}`);
  };

  return <PopOver handleDelete={handleDelete} handleUpdate={handleUpdate} />;
};

export default Actions;
