import { Input } from "antd";
import type { InputProps } from "antd/lib";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "use-debounce";

type SearchInputProps = {
  searchBy?: string;
  searchValue?: string;
  onSearchValueChange?: (value: string | undefined) => void;
} & InputProps;

function SearchInput({
  onSearchValueChange,
  searchValue,
  ...props
}: SearchInputProps) {
  const [search, setSearch] = useState(searchValue ?? "");

  const [debouncedSearch] = useDebounce(search, 500);

  const { t } = useTranslation();

  useEffect(() => {
    if (onSearchValueChange) {
      onSearchValueChange(debouncedSearch);
    }
  }, [debouncedSearch, onSearchValueChange]);

  useEffect(() => {
    setSearch(searchValue ?? "");
  }, [searchValue]);

  return (
    <Input
      {...props}
      value={search}
      allowClear={false}
      onChange={(e) => setSearch(e.target.value)}
      placeholder={t("userTable.searchPlaceHolder")}
      style={{ width: 300 }}
    />
  );
}

export default SearchInput;
