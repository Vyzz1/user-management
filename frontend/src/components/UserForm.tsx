import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Select,
} from "antd";
import { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import useSubmitData from "../hooks/useSubmitData";
import { useQueryClient } from "@tanstack/react-query";
import CustomButton from "./styles/CustomButton.style";
interface UserFormProps {
  isEdit?: boolean;
  inititalValues?: User;
  trigger?: React.ReactNode;
  onSubmit?: () => void;
}

type UserForm = Omit<User, "id" | "createdAt"> & {
  birthdate: Date | string;
};

const FormCard = styled.div`
  border-radius: 4px;
  margin: 20px 0;

  .ant-form-item {
    margin-bottom: 28px;
  }
  .ant-form-item-label > label {
  }
`;

export default function UserForm({
  isEdit,
  inititalValues,
  onSubmit,
}: UserFormProps) {
  const [open, setOpen] = useState(false);
  const buttonTrigger = (
    <CustomButton
      onClick={() => setOpen(true)}
      htmlType="button"
      size="small"
      glow
      customVariant="gradient"
    >
      {isEdit ? "Edit User" : "Add User"}
    </CustomButton>
  );

  const [form] = Form.useForm<UserForm>();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useSubmitData(
    isEdit ? `/users/${inititalValues?.id}` : "/users",
    () => {
      onSubmit?.();
      queryClient.invalidateQueries({
        queryKey: ["fetchData", "/users"],
      });
      message.success(`User ${isEdit ? "updated" : "added"} successfully`);
      setOpen(false);
    },
    (error: any) => {
      console.error("Error submitting user data:", error);

      const messageError = error.response?.data?.message || "Unknown error";
      message.error(messageError);
    }
  );

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPending) {
        e.preventDefault();

        return "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    if (isPending) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPending]);

  const transformedInitialValues = inititalValues
    ? {
        ...inititalValues,
        birthdate: inititalValues.birthdate
          ? dayjs(inititalValues.birthdate)
          : undefined,
      }
    : undefined;

  const onFinish = (values: UserForm) => {
    const transformedValues: UserForm = {
      ...values,
      birthdate:
        values.birthdate instanceof Date
          ? values.birthdate
          : new Date(values.birthdate),
    };

    mutate({
      data: transformedValues,
      type: isEdit ? "put" : "post",
    });
  };

  return (
    <>
      {buttonTrigger}
      <Modal
        centered
        open={open}
        footer={null}
        onCancel={() => {
          if (!isPending) {
            setOpen(false);
          }
        }}
        title={isEdit ? "Edit User" : "Add User"}
      >
        <FormCard>
          <Form<UserForm>
            initialValues={transformedInitialValues}
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <Input readOnly={isEdit} disabled={isEdit} />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[
                {
                  required: true,
                  message: "Please input proper avatar!",
                  type: "url",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Flex gap={16}>
              <Form.Item
                style={{ flex: 1 }}
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please input your gender!",
                    type: "string",
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      value: "female",
                      label: "Female",
                    },
                    {
                      value: "male",
                      label: "Male",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                style={{ flex: 1 }}
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please input your city!",
                    type: "string",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Flex>

            <Form.Item
              label="Date of Birth"
              name="birthdate"
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }

                    const selectedDate = dayjs(value);
                    const today = dayjs();
                    const eighteenYearsAgo = today.subtract(18, "year");

                    if (selectedDate.isAfter(today)) {
                      return Promise.reject(
                        new Error("Date of birth cannot be in the future!")
                      );
                    }

                    if (selectedDate.isAfter(eighteenYearsAgo)) {
                      return Promise.reject(
                        new Error("You must be at least 18 years old!")
                      );
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                placeholder="Select date of birth"
                disabledDate={(current) => {
                  const today = dayjs();
                  const eighteenYearsAgo = today.subtract(18, "year");
                  return (
                    current &&
                    (current.isAfter(today) ||
                      current.isAfter(eighteenYearsAgo))
                  );
                }}
              />
            </Form.Item>
            <Flex justify="end" gap={18}>
              <Button
                disabled={isPending}
                htmlType="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button loading={isPending} type="primary" htmlType="submit">
                {isEdit ? "Update" : "Add"}
              </Button>
            </Flex>
          </Form>
        </FormCard>
      </Modal>
    </>
  );
}
