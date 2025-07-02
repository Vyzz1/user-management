import { Avatar, Flex, Table, type TableProps } from "antd";
import { format } from "date-fns";
import DeleteConfirm from "./DeleteConfirm";
import UserForm from "./UserForm";

interface UserTableProps {
  users: User[];
}

function UserTable({ users }: UserTableProps) {
  const onEdited = () => {};

  const columns: TableProps<User>["columns"] = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => {
        if (!a.name || !b.name) return 0;
        return a.name.localeCompare(b.name);
      },
    },

    {
      key: "email",
      title: "Infor",
      dataIndex: "email",
      render: (_, { email, gender, avatar }) => {
        return (
          <Flex align="center" gap={8}>
            <Avatar src={avatar} size="default" />
            <Flex vertical>
              <p className="text-sm ">{email}</p>
              <p className="capitalize text-xs">{gender}</p>
            </Flex>
          </Flex>
        );
      },
      sorter: (a, b) => {
        if (!a.email || !b.email) return 0;
        return a.email.localeCompare(b.email);
      },
      filters: [
        {
          text: "Male",
          value: "male",
        },
        {
          text: "Female",
          value: "female",
        },
      ],
      onFilter: (value, record) => {
        return record.gender === value;
      },
    },
    {
      key: "city",
      title: "City",
      dataIndex: "city",
    },

    {
      key: "createdAt",
      title: "Created Time",
      dataIndex: "createdAt",
      render: (_, { createdAt }) => {
        return <p>{format(new Date(createdAt), "PPP")}</p>;
      },
      sorter: (a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA.getTime() - dateB.getTime();
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Flex gap={8}>
          <UserForm onSubmit={onEdited} isEdit inititalValues={record} />
          <DeleteConfirm
            term="user"
            queryKey="/users"
            id={record.id!}
            onDelete={(id) => console.log("Delete user with id:", id)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Table<User>
      rowKey={(record) => record.id.toString()}
      columns={columns}
      dataSource={users}
    />
  );
}

export default UserTable;
