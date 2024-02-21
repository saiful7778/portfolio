"use client";
import { useRouter } from "next/navigation";
import Alert from "@/lib/config/Alert.config";
import revalidate from "@/lib/revalidate";
import deleteProject from "@/lib/actions/deleteProject";
import PopOver from "@/components/PopOver";

const Actions = ({ projectId, slug }) => {
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
        const res = await deleteProject(projectId);
        if (!res.success) {
          Alert.fire({
            icon: "error",
            text: res.message,
          });
          return;
        }
        Alert.fire({
          icon: "success",
          title: "Project is deleted!",
        });
      } catch (err) {
        Alert.fire({
          icon: "error",
          text: err,
        });
      }
      revalidate("/admin/project/all_projects");
    }
  };

  const handleUpdate = () => {
    router.push(`/admin/project/update/${slug}?projectId=${projectId}`);
  };

  return <PopOver handleDelete={handleDelete} handleUpdate={handleUpdate} />;
};

export default Actions;
