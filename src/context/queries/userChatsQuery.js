import { infiniteQueryOptions } from "@tanstack/react-query";
import { getUserChats } from "../../services/user";

export default function userChatsOptions(searchText = "") {
  return infiniteQueryOptions({
    queryKey: ["userChats"],
    queryFn: async ({ pageParam }) => {
      return getUserChats(searchText, pageParam.offset, pageParam.limit).then(
        (res) => {
          return res;
        }
      );
    },
    initialPageParam: { limit: 15, offset: 0 },
    getNextPageParam: (lastPage) => {
      return { offset: lastPage.offset + lastPage.limit, limit: 15 };
    },
  });
}
