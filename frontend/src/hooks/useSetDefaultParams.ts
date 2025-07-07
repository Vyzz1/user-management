import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserTableState } from "../features/user/userTableSlice";

export default function useSetDefaultParams(searchParams: string) {
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const initialParams: Record<string, any> = {};
    urlParams.forEach((value, key) => {
      if (key.startsWith("filter_")) {
        initialParams["filters"] = {
          [key.replace("filter_", "")]: value.split(","),
        };
      } else if (key === "pageSize") {
        initialParams["pagination"] = {
          ...initialParams["pagination"],
          pageSize: Number(value),
        };
      } else if (key === "currentPage") {
        initialParams["pagination"] = {
          ...initialParams["pagination"],
          current: Number(value),
        };
      } else {
        initialParams[key] = value;
      }
    });

    dispatch(setUserTableState(initialParams));
  }, []);
}
