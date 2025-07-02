import { useQuery } from "@tanstack/react-query";
import { Axios } from "axios";
import axios from "../api/axios";

export const fetchData = async (customAxios: Axios, endpoint: string) => {
  const response = await customAxios.get(endpoint);
  return response.data;
};
const useFetchData = (
  endpoint: string,
  uniqueKey: string = "",
  enable: boolean = true
) => {
  const queryKey =
    uniqueKey !== ""
      ? ["fetchData", endpoint, uniqueKey]
      : ["fetchData", endpoint];
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      return fetchData(axios, endpoint);
    },
    enabled: enable,
  });
};
export default useFetchData;
