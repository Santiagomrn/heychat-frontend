import { infiniteQueryOptions } from "@tanstack/react-query";
import { getUsers } from "../../services/user";

export default function usersOptions(searchText) {
  return infiniteQueryOptions({
    queryKey: ["users"],
    queryFn: async ({ pageParam }) => {
      if (searchText == "") return { data: [] };
      return getUsers(searchText, pageParam.offset, pageParam.limit).then(
        (res) => {
          return res;
        }
      );
    },
    initialPageParam: { limit: 15, offset: 0 },
    getNextPageParam: (lastPage) => {
      return { offset: lastPage.offset + lastPage.limit, limit: 15 };
    },
    enabled: false,
  });
}
