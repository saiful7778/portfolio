"use client";
import Button from "@/components/utilities/Button";
import deleteContact from "@/lib/actions/contact/deleteContact";
import Alert from "@/config/Alert.config";
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
        await deleteContact(contactId);
        Alert.fire({
          icon: "success",
          title: "Contact details is deleted!",
        });
      } catch (err) {
        console.error(err);
        Alert.fire({
          icon: "error",
          text: "Something went wrong",
        });
      } finally {
        revalidate("/admin/contacts");
      }
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
