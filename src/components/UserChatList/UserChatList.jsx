import InfiniteScroll from "react-infinite-scroll-component";
import UserListItem from "../UserListItem/UserListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import userChatsOptions from "../../context/queries/userChatsQuery";
import { useEffect } from "react";
import { socket } from "../../services/socket";
import { queryClient } from "../../context/QueryClient";
import _ from "lodash";
import findAndReplaceById from "../../utils/findAndReplace";
import chatOptions from "../../context/queries/chatQuery";

export default function UserChatList({
  onClickItem,
  searchText,
  chatWithUser,
}) {
  const newMessageListener = (message) => {
    queryClient.setQueryData(
      chatOptions(message?.senderId).queryKey,
      (data) => {
        return {
          pages: [{ data: [message] }, ...data.pages],
          pageParams: [{ limit: 1, offset: 0 }, ...data.pageParams],
        };
      }
    );
    queryClient.refetchQueries(userChatsOptions(searchText));
    socket.emit("messageDelivered", message.id, (message) => {
      queryClient.setQueryData(
        chatOptions(message?.senderId).queryKey,
        (data) => {
          const dataCopy = _.cloneDeep(data);
          const pages = findAndReplaceById(dataCopy.pages, message.id, message);
          return { pages, pageParams: [...data.pageParams] };
        }
      );
    });
  };
  const messageDeliveredListener = (message) => {
    queryClient.setQueryData(
      chatOptions(message?.receiverId).queryKey,
      (data) => {
        const dataCopy = _.cloneDeep(data);
        console.log(dataCopy);
        const pages = findAndReplaceById(dataCopy.pages, message.id, message);
        return { pages, pageParams: [...data.pageParams] };
      }
    );
  };
  const messageReadListener = (message) => {
    queryClient.setQueryData(
      chatOptions(message?.receiverId).queryKey,
      (data) => {
        const dataCopy = _.cloneDeep(data);
        console.log(dataCopy);
        const pages = findAndReplaceById(dataCopy.pages, message.id, message);
        return { pages, pageParams: [...data.pageParams] };
      }
    );
  };
  const onlineUserListener = (onlineUser) => {
    queryClient.setQueryData(userChatsOptions().queryKey, (data) => {
      if (data == undefined) return data;
      const dataCopy = _.cloneDeep(data);
      const pages = findAndReplaceById(
        dataCopy.pages,
        onlineUser.id,
        onlineUser
      );
      return { pages, pageParams: [...dataCopy.pageParams] };
    });
  };
  const offlineUserListener = (offlineUser) => {
    queryClient.setQueryData(userChatsOptions().queryKey, (data) => {
      if (data == undefined) return data;
      const dataCopy = _.cloneDeep(data);
      const pages = findAndReplaceById(
        dataCopy.pages,
        offlineUser.id,
        offlineUser
      );
      return { pages, pageParams: [...data.pageParams] };
    });
  };
  useEffect(() => {
    socket.on("newMessage", newMessageListener);
    socket.on("messageDelivered", messageDeliveredListener);
    socket.on("messageRead", messageReadListener);
    socket.on("onlineUser", onlineUserListener);
    socket.on("offlineUser", offlineUserListener);
    return () => {
      socket.removeListener("onlineUser", onlineUserListener);
      socket.removeListener("offlineUser", offlineUserListener);
      socket.removeListener("newMessage", newMessageListener);
      socket.removeListener("messageDelivered", messageDeliveredListener);
      socket.removeListener("messageRead", messageReadListener);
    };
  }, []);
  const {
    data: loaderUserChats,
    isLoading: isLoadingUserChats,
    fetchNextPage: loaderUserChatsFetchNextPage,
    hasNextPage: loaderUserChatsHasNextPage,
  } = useInfiniteQuery(userChatsOptions(searchText));
  const userChats = loaderUserChats?.pages?.reduce((acc, page) => {
    return [...acc, ...page.data];
  }, []);
  return (
    <>
      {!isLoadingUserChats && (
        <InfiniteScroll
          dataLength={userChats?.length ?? 0}
          next={() => loaderUserChatsFetchNextPage()}
          hasMore={loaderUserChatsHasNextPage}
          loading={<div style={{ color: "white" }}>Loading...</div>}
          style={{
            scrollbarColor: "#999999 #ffffff00",
          }}
          height={"90vh"}
        >
          {userChats.map((user) => {
            return (
              <UserListItem
                key={user.id}
                user={user}
                onClick={() => onClickItem(user)}
                selected={user?.id == chatWithUser?.id}
              ></UserListItem>
            );
          })}
        </InfiniteScroll>
      )}
    </>
  );
}
