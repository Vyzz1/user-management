import {
  Avatar,
  Flex,
  Space,
  Table,
  type TablePaginationConfig,
  type TableProps,
} from "antd";
import { format } from "date-fns";
import DeleteConfirm from "./DeleteConfirm";
import UserForm from "./UserForm";
import { useTranslation } from "react-i18next";
import { getDateFnsLocale } from "../utils/locate";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import type { SorterResult } from "antd/es/table/interface";
import type { GetProp } from "antd/lib";
import { useMemo, useState } from "react";
import { setUserTableState } from "../features/user/userTableSlice";
import {
  getDefaultSorter,
  userTableStateToSearchParams,
} from "../utils/userTableParams";
import ColumnsSelection from "./ColumnsSelection";
import { useSearchParams } from "react-router-dom";

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
  inputSearch?: string;
}

interface UserTableProps {
  users: User[];
  loading?: boolean;
  total: number;
}
function UserTable({ users, loading = false, total }: UserTableProps) {
  const onEdited = () => {};

  const { t } = useTranslation();

  const { language } = useSelector((state: RootState) => state.language);

  const { columns: stateColumns } = useSelector(
    (state: RootState) => state.userColumns
  );

  const params = useSelector((state: RootState) => state.userTable);

  const dispatch = useDispatch();

  const [tableParams, setTableParams] = useState<TableParams>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUrlParams] = useSearchParams();

  const { infor, city, action, createdAt, name } = t(
    "userTable.columns"
  ) as unknown as Record<string, string>;

  const { male, female } = t("userTable.filter") as unknown as Record<
    string,
    string
  >;

  const columns: TableProps<User>["columns"] = useMemo(
    () => [
      {
        key: "name",
        dataIndex: "name",
        sorter: true,
        title: name,

        ...{
          ...getDefaultSorter({
            refField: params.sortField!,
            fieldName: "name",
            sortOrder: params.sortOrder as "ascend" | "descend",
          }),
        },
      },

      {
        key: "gender",
        title: infor,
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
        sorter: true,
        ...{
          ...getDefaultSorter({
            refField: params.sortField!,
            fieldName: "email",
            sortOrder: params.sortOrder as "ascend" | "descend",
          }),
        },
        filters: [
          {
            text: male,
            value: "male",
          },
          {
            text: female,
            value: "female",
          },
        ],
        filteredValue: params.filters.gender,
      },
      {
        key: "city",
        title: city,
        dataIndex: "city",
      },

      {
        key: "createdAt",
        title: createdAt,
        dataIndex: "createdAt",
        render: (_, { createdAt }) => {
          return (
            <p>
              {format(new Date(createdAt), "PPP", {
                locale: getDateFnsLocale(language),
              })}
            </p>
          );
        },
        sorter: true,

        ...{
          ...getDefaultSorter({
            refField: params.sortField!,
            fieldName: "createdAt",
            sortOrder: params.sortOrder as "ascend" | "descend",
          }),
        },
      },

      {
        title: action,
        key: "actions",
        render: (_, record) => (
          <Flex gap={8}>
            <UserForm onSubmit={onEdited} isEdit inititalValues={record} />
            <DeleteConfirm
              term="user"
              id={record.id!}
              onDelete={(id) => console.log("Delete user with id:", id)}
            />
          </Flex>
        ),
      },
    ],
    [name, params, infor, male, female, city, createdAt, action, language]
  );

  const handleTableChange: TableProps<User>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    const params = {
      ...tableParams,
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    };

    setTableParams(params);

    dispatch(setUserTableState(params));

    const searchParams = userTableStateToSearchParams(
      {
        sortField: params.sortField as string | undefined,
        sortOrder: params.sortOrder as "ascend" | "descend" | undefined,
        filters: params.filters || {},
        currentPage: params.pagination?.current || 1,
        pageSize: params.pagination?.pageSize || 10,
      },
      window.location.search
    );
    setUrlParams(searchParams);
  };

  const newColumns = columns?.map((column) => ({
    ...column,
    hidden: !stateColumns?.includes(column.key as string),
  }));

  return (
    <Space
      direction="vertical"
      style={{ width: "100%", padding: "20px", backgroundColor: "#fff" }}
    >
      <ColumnsSelection
        displayColumns={newColumns.map((col) => ({
          key: col.key as string,
          name: col.title as string,
          hidden: !stateColumns?.includes(col.key as string),
        }))}
      />

      <Table<User>
        rowKey={(record) => record.id.toString()}
        columns={newColumns}
        dataSource={users}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: "max-content" }}
        pagination={{
          current: params.currentPage,
          pageSize: params.pageSize,
          total: total,
          showSizeChanger: true,
        }}
      />
    </Space>
  );
}

export default UserTable;
