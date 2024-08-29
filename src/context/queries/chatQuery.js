import { infiniteQueryOptions } from "@tanstack/react-query";
import { getChatWith } from "../../services/messages";

export default function chatOptions(chatWithUserId) {
  return infiniteQueryOptions({
    queryKey: ["chat", chatWithUserId],
    queryFn: async ({ pageParam }) => {
      return getChatWith(
        chatWithUserId,
        pageParam.offset,
        pageParam.limit
      ).then((res) => {
        return res;
      });
    },
    initialPageParam: { limit: 20, offset: 0 },
    getNextPageParam: (lastPage) => {
      return { offset: lastPage.offset + lastPage.limit, limit: 20 };
    },
    enabled: !!chatWithUserId,
  });
}
