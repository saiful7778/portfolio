"use client";
import { FaTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Popover } from "keep-react";
import Button from "@/components/utilities/Button";
import { useRouter } from "next/navigation";
import revalidate from "@/lib/revalidate";
import Alert from "@/lib/config/Alert.config";
import deleteBlog from "@/lib/actions/deleteBlog";

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

  return (
    <>
      <Popover
        showDismissIcon={false}
        showArrow={false}
        position="left"
        className="border border-gray-700 !bg-gray-800 !px-2 !py-2 "
      >
        <Popover.Action>
          <Button size="sm" variant="primary-outline" shape="icon-button">
            <BsThreeDotsVertical size={15} />
          </Button>
        </Popover.Action>
        <Popover.Container className="!mt-0 !block">
          <ul>
            <li>
              <button
                onClick={handleDelete}
                className="flex w-full items-center justify-between gap-4 rounded px-2 py-1 hover:bg-gray-700"
              >
                <span>Delete</span>
                <span>
                  <FaTrashCan />
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={handleUpdate}
                className="flex w-full items-center justify-between gap-4 rounded px-2 py-1 hover:bg-gray-700"
              >
                <span>Edit</span>
                <span>
                  <CiEdit strokeWidth={1} />
                </span>
              </button>
            </li>
          </ul>
        </Popover.Container>
      </Popover>
    </>
  );
};

export default Actions;
