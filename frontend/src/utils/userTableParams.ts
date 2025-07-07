import type { UserTableState } from "../features/user/userTableSlice";

export function userTableStateToSearchParams(
  state: UserTableState,
  defaultValue?: string
): URLSearchParams {
  const params = new URLSearchParams(defaultValue);
  params.delete("sortField");
  params.delete("sortOrder");
  params.delete("currentPage");
  params.delete("pageSize");

  Object.keys(state.filters).forEach((key) => {
    params.delete(`filter_${key}`);
  });
  if (state.sortField) params.set("sortField", String(state.sortField));
  if (state.sortOrder) params.set("sortOrder", state.sortOrder);
  if (state.currentPage) {
    if (state.currentPage > 1) {
      params.set("currentPage", String(state.currentPage));
    }
  }
  if (state.pageSize) params.set("pageSize", String(state.pageSize));
  if (state.filters) {
    Object.entries(state.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(`filter_${key}`, String(value));
      }
    });
  }
  return params;
}
export function searchInputToSearchParams(
  defaultValue?: string,
  value?: string
): URLSearchParams {
  console.log("Call searchInputToSearchParams");
  const params = new URLSearchParams(defaultValue);
  params.delete("inputSearch");

  if (value) {
    params.set("inputSearch", value);
  } else {
    params.delete("inputSearch");
  }

  return params;
}

export function getDefaultSorter({
  refField,
  fieldName,
  sortOrder,
}: {
  refField: string;
  fieldName: string;
  sortOrder: "ascend" | "descend";
}) {
  if (refField === fieldName) {
    return {
      sortOrder,
    };
  }
}
