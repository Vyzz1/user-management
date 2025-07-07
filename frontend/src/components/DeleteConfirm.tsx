import { message, Popconfirm, type PopconfirmProps } from "antd";
import { useEffect, useState } from "react";

import CustomButton from "./styles/CustomButton.style";
import { useTranslation } from "react-i18next";
import { useDeleteUserMutation } from "../features/user/userApiSlice";

interface DeleteConfirmProps {
  id: number;
  onDelete: (id: string) => void;
  term: string;
}

function DeleteConfirm({ id, onDelete, term }: DeleteConfirmProps) {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const [mutation, { isLoading, isError, isSuccess, reset }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (isError) {
      message.error(t("deleteConfirm.error"));
    }
    if (isSuccess) {
      reset();
      message.success(t("deleteConfirm.success"));
      onDelete(id.toString());
      setOpen(false);
    }
  }, [isError, isSuccess, t, onDelete, id, reset]);

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    mutation({ id });
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.info("User deletion cancelled");
    setOpen(false);
  };
  return (
    <Popconfirm
      title={t("deleteConfirm.title", { term })}
      description={t("deleteConfirm.description", { term })}
      placement="topRight"
      onConfirm={confirm}
      open={open}
      onCancel={cancel}
      okButtonProps={{ loading: isLoading }}
      okText={t("deleteConfirm.ok")}
      cancelText={t("deleteConfirm.cancel")}
    >
      <CustomButton
        customVariant="danger"
        size="small"
        onClick={() => setOpen(true)}
      >
        {t("deleteConfirm.button")}
      </CustomButton>
    </Popconfirm>
  );
}

export default DeleteConfirm;
