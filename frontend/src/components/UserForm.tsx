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
import CustomButton from "./styles/CustomButton.style";
import { useTranslation } from "react-i18next";
import { useCreateOrUpdateUserMutation } from "../features/user/userApiSlice";
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
  const { t } = useTranslation();

  const userFormLng = t("userForm") as unknown as Record<string, string>;

  const errorMsg = userFormLng.error as unknown as Record<string, string>;

  const genderOptions = userFormLng.genderOptions as unknown as Record<
    string,
    string
  >;

  const [open, setOpen] = useState(false);
  const buttonTrigger = (
    <CustomButton
      onClick={() => setOpen(true)}
      htmlType="button"
      size="small"
      glow
      customVariant="gradient"
    >
      {isEdit ? userFormLng.editTitle : userFormLng.addTitle}
    </CustomButton>
  );

  const [form] = Form.useForm<UserForm>();

  const [mutation, { isLoading: isPending, isSuccess, reset }] =
    useCreateOrUpdateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      reset();
      onSubmit?.();

      message.success(isEdit ? userFormLng.updatedMsg : userFormLng.createdMsg);

      setOpen(false);
    }
  }, [isSuccess, isEdit, userFormLng, onSubmit, reset]);

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

    mutation({
      ...transformedValues,
      isEdit: isEdit || false,
      id: inititalValues?.id,
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
        title={isEdit ? userFormLng.editTitle : userFormLng.addTitle}
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
                  message: errorMsg.email || "Email is required",
                  type: "email",
                },
              ]}
            >
              <Input readOnly={isEdit} disabled={isEdit} />
            </Form.Item>
            <Form.Item
              label={userFormLng.name}
              name="name"
              rules={[
                {
                  required: true,
                  message: errorMsg.name || "Name is required",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={userFormLng.avatar}
              name="avatar"
              rules={[
                {
                  required: true,
                  message: errorMsg.avatar || "Avatar is required",
                  type: "url",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Flex gap={16}>
              <Form.Item
                style={{ flex: 1 }}
                label={userFormLng.gender}
                name="gender"
                rules={[
                  {
                    required: true,
                    message: errorMsg.gender || "Gender is required",
                    type: "string",
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      value: "female",
                      label: genderOptions.male,
                    },
                    {
                      value: "male",
                      label: genderOptions.female,
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                style={{ flex: 1 }}
                label={userFormLng.city}
                name="city"
                rules={[
                  {
                    required: true,
                    message: errorMsg.city || "City is required",
                    type: "string",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Flex>

            <Form.Item
              label={userFormLng.dateOfBirth}
              name="birthdate"
              rules={[
                {
                  required: true,
                  message: errorMsg.dateOfBirth || "Date of Birth is required",
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
                        new Error(
                          errorMsg.futureDate ||
                            "Date of Birth cannot be in the future"
                        )
                      );
                    }

                    if (selectedDate.isAfter(eighteenYearsAgo)) {
                      return Promise.reject(
                        new Error(
                          errorMsg.eighteenYearsOld ||
                            "You must be at least 18 years old"
                        )
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
                {userFormLng.cancle || "Cancel"}
              </Button>
              <Button loading={isPending} type="primary" htmlType="submit">
                {userFormLng.submit || "Submit"}
              </Button>
            </Flex>
          </Form>
        </FormCard>
      </Modal>
    </>
  );
}
