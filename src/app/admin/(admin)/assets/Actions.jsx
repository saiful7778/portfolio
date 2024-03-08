"use client";
import Button from "@/components/utilities/Button";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import deleteImageData from "@/lib/actions/image/deleteImageData";
import Alert from "@/config/Alert.config";
import revalidate from "@/lib/revalidate";
import { FaTrashCan } from "react-icons/fa6";

const Actions = ({ url, id }) => {
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
        await edgestore.portfolioImages.delete({
          url,
        });
        await deleteImageData(id);
        Alert.fire({
          icon: "success",
          title: "Image is deleted!",
        });
      } catch (err) {
        console.error(err);
        Alert.fire({
          icon: "error",
          text: err,
        });
      }
      revalidate("/admin/assets");
    }
  };
  return (
    <div>
      <Button
        onClick={handleDelete}
        variant="cancel"
        size="sm"
        shape="icon-button"
      >
        <FaTrashCan />
      </Button>
    </div>
  );
};

export default Actions;
