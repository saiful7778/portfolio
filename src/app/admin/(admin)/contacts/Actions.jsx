"use client";
import Button from "@/components/utilities/Button";
import deleteContact from "@/lib/actions/deleteContact";
import Alert from "@/lib/config/Alert.config";
import revalidate from "@/lib/revalidate";
import { FaTrashCan } from "react-icons/fa6";

const Actions = ({ contactId }) => {
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
        const res = await deleteContact(contactId);
        if (!res.success) {
          Alert.fire({
            icon: "error",
            text: res.message,
          });
          return;
        }
        Alert.fire({
          icon: "success",
          title: "Contact details is deleted!",
        });
      } catch (err) {
        Alert.fire({
          icon: "error",
          text: err,
        });
      }
      revalidate("/admin/contacts");
    }
  };

  return (
    <Button
      onClick={handleDelete}
      variant="cancel"
      size="sm"
      shape="icon-button"
    >
      <FaTrashCan />
    </Button>
  );
};

export default Actions;
