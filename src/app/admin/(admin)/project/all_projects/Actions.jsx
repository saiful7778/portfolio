"use client";
import { useRouter } from "next/navigation";
// components
import { Popover } from "keep-react";
import Button from "@/components/utilities/Button";
// icons
import { FaTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
// others
import Alert from "@/lib/config/Alert.config";
import deleteProject from "./delete";
import revalidate from "@/lib/revalidate";

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
      revalidate("/admin/all_projects");
    }
  };

  const handleUpdate = () => {
    router.push(`/admin/project/update/${slug}?projectId=${projectId}`);
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
