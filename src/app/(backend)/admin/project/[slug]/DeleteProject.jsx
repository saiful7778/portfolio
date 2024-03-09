"use client";
import Button from "@/components/utilities/Button";
import Alert from "@/config/Alert.config";
import { useRouter } from "next/navigation";
import deleteProject from "@/lib/actions/project/deleteProject";
import revalidate from "@/lib/revalidate";
import { useEdgeStore } from "@/context/EdgeStoreContext";

const DeleteProject = ({ projectId, thumbnail }) => {
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
        await deleteProject(projectId);
        await edgestore.portfolioImages.delete({
          url: thumbnail,
        });
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
