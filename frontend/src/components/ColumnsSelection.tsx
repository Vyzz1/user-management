import { Button, Dropdown, Flex, Select, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { setUserColumns } from "../features/user/userColumnsSlice";
import { SettingOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface ColumnsSelectionProps {
  displayColumns: {
    key: string;
    name: string;
    hidden: boolean;
  }[];
}

function ColumnsSelection({ displayColumns }: ColumnsSelectionProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  console.log(displayColumns);

  const allKeys = useMemo(
    () => displayColumns.map((col) => col.key),
    [displayColumns]
  );

  const menu = (
    <div
      style={{
        padding: "12px",
        minWidth: "250px",
        background: "white",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
      }}
    >
      <Flex vertical gap={8}>
        <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
          {t("userTable.columnSettings", "Column Settings")}
        </div>
        <Select
          style={{ width: "100%" }}
          mode="multiple"
          onChange={(value) => {
            dispatch(setUserColumns(value as string[]));
          }}
          value={allKeys.filter((key) =>
            displayColumns.some((col) => col.key === key && !col.hidden)
          )}
          placeholder={t(
            "userTable.selectColumns",
            "Select columns to display"
          )}
          options={displayColumns.map((col) => ({
            label: col.name,
            value: col.key,
          }))}
        />
        <Flex gap={8} justify="space-between" style={{ marginTop: "8px" }}>
          <Button size="small" onClick={() => dispatch(setUserColumns([]))}>
            {t("table.hideAll", "Hide All")}
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => dispatch(setUserColumns(allKeys))}
          >
            {t("table.showAll", "Show All")}
          </Button>
        </Flex>
      </Flex>
    </div>
  );

  return (
    <Dropdown
      popupRender={() => menu}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Tooltip title={t("userTable.columnSettings", "Column Settings")}>
        <Button icon={<SettingOutlined />} type="default" size="small">
          {t("userTable.columnSettings", "Column Settings")}
        </Button>
      </Tooltip>
    </Dropdown>
  );
}

export default ColumnsSelection;
