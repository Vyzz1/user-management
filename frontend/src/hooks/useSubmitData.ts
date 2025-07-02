import { useMutation } from "@tanstack/react-query";
import { Axios, type AxiosResponse } from "axios";
import axios from "../api/axios";

type AxiosType = "post" | "patch" | "put" | "delete";

const fetchData = async (
  axiosPrivate: Axios,
  endpoint: string,
  body: Record<string | number, unknown>,
  type: AxiosType
): Promise<unknown> => {
  const methods = {
    post: axiosPrivate.post,
    patch: axiosPrivate.patch,
    put: axiosPrivate.put,
    delete: axiosPrivate.delete,
  };

  try {
    const response: AxiosResponse = await methods[type](endpoint, body);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const useSubmitData = (
  endpoint: string,
  onSuccess: (data: unknown) => void,
  onError?: (error: unknown) => void
) => {
  return useMutation({
    mutationKey: [endpoint],
    mutationFn: async ({
      data,
      type,
    }: {
      data: Record<string | number, unknown>;
      type: AxiosType;
    }) => {
      return fetchData(axios, endpoint, data, type);
    },
    onSuccess,
    onError,
  });
};

export default useSubmitData;
