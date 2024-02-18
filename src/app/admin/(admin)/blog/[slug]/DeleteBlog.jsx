"use client";
import Button from "@/components/utilities/Button";

const DeleteBlog = ({ blogId }) => {
  const handleDelete = () => {
    console.log(blogId);
  };
  return (
    <Button onClick={handleDelete} variant="cancel">
      Delete
    </Button>
  );
};

export default DeleteBlog;
