import { message, Popconfirm, type PopconfirmProps } from "antd";
import { useState } from "react";
import useSubmitData from "../hooks/useSubmitData";
import { useQueryClient } from "@tanstack/react-query";
import CustomButton from "./styles/CustomButton.style";

interface DeleteConfirmProps {
  id: number;
  onDelete: (id: string) => void;
  queryKey: string;
  term: string;
}

function DeleteConfirm({ id, onDelete, queryKey, term }: DeleteConfirmProps) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useSubmitData(
    `/users/${id}`,
    () => {
      message.success("User deleted successfully");

      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["fetchData", queryKey],
        });
        onDelete(id.toString());
        setOpen(false);
      }, 100);
    },
    (error) => {
      console.error("Error deleting user:", error);
      message.error("Failed to delete user");
      setOpen(false);
    }
  );

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    mutate({ data: {}, type: "delete" });
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.info("User deletion cancelled");
    setOpen(false);
  };
  return (
    <Popconfirm
      title={`Delete ${term} ?`}
      description={`Are you sure to delete this ${term}?`}
      onConfirm={confirm}
      open={open}
      onCancel={cancel}
      okButtonProps={{ loading: isPending }}
      okText="Yes"
      cancelText="No"
    >
      <CustomButton
        customVariant="danger"
        size="small"
        onClick={() => setOpen(true)}
      >
        Delete
      </CustomButton>
    </Popconfirm>
  );
}

export default DeleteConfirm;
