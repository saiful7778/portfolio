"use client";
import Button from "@/components/utilities/Button";
import Alert from "@/lib/config/Alert.config";
import deleteProject from "../all_projects/delete";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

const DeleteProject = ({ projectId }) => {
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
        if (res.success) {
          Alert.fire({
            icon: "success",
            title: "Project is deleted!",
          });
        } else {
          Alert.fire({
            icon: "error",
            text: res.message,
          });
        }
      } catch (err) {
        Alert.fire({
          icon: "error",
          text: err,
        });
      }
      revalidatePath("/admin/project/all_projects");
      router.push("/admin/project/all_projects");
    }
  };
  return (
    <Button onClick={handleDelete} variant="cancel">
      Delete
    </Button>
  );
};

export default DeleteProject;
