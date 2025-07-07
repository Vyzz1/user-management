import { useMemo } from "react";
import type { UserTableState } from "../features/user/userTableSlice";

export default function useGetApiParams(params: UserTableState) {
  const apiParams = useMemo(() => {
    const queryParams: Record<string, any> = {};
    if (params.sortField) queryParams.sortField = params.sortField;
    if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
    if (params.currentPage) queryParams.currentPage = params.currentPage;
    if (params.pageSize) queryParams.pageSize = params.pageSize;
    if (params.inputSearch) queryParams.inputSearch = params.inputSearch;

    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams[`filter_${key}`] = value;
        }
      });
    }

    return queryParams;
  }, [params]);

  return apiParams;
}
