import CustomButton from "./styles/CustomButton.style";
import { useDispatch } from "react-redux";
import { resetUserTableState } from "../features/user/userTableSlice";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

function ResetFilter() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [urlParams, setUrlParams] = useSearchParams();

  return (
    <CustomButton
      onClick={() => {
        dispatch(resetUserTableState());

        const params = new URLSearchParams(urlParams.toString());

        // Remove all params except pagination
        Array.from(params.keys()).forEach((key) => {
          if (key !== "currentPage" && key !== "pageSize") {
            params.delete(key);
          }
        });

        setUrlParams(params);
      }}
      customVariant="secondary"
    >
      {t("resetFilter")}
    </CustomButton>
  );
}

export default ResetFilter;
