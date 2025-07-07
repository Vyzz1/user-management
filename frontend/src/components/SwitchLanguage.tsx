import { Select } from "antd";
import type { BaseOptionType } from "antd/es/select";

function SwitchLanguage({
  className,
  ...props
}: BaseOptionType & {
  className?: string;
}) {
  return (
    <Select className={className} {...props}>
      <Select.Option value="en">English</Select.Option>
      <Select.Option value="fr">Français</Select.Option>
      <Select.Option value="vi">Tiếng Việt</Select.Option>
    </Select>
  );
}

export default SwitchLanguage;
