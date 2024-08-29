import { useInfiniteQuery } from "@tanstack/react-query";
import chatOptions from "../../context/queries/chatQuery";
import { Avatar, Badge, Box, ListItemButton, Paper } from "@mui/material";
import { socket } from "../../services/socket";
import { queryClient } from "../../context/QueryClient";
import _ from "lodash";
import findAndReplaceById from "../../utils/findAndReplace";
import formatUTCTo12Hour from "../../utils/timeFormater";
import DoneAllIcon from "@mui/icons-material/DoneAll";
export default function UserListItem({ user, onClick, selected }) {
  const { data } = useInfiniteQuery(chatOptions(user.id));

  const messages = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.data];
  }, []);
  const unreadMessages = messages?.filter(
    (message) => !message.read && message.senderId == user.id
  );
  const unDeliveredMessages = unreadMessages?.filter(
    (message) => !message.delivered && message.senderId == user.id
  );

  unDeliveredMessages?.map((unDeliveredMessage) => {
    socket.emit("messageDelivered", unDeliveredMessage.id, (message) => {
      queryClient.setQueryData(
        chatOptions(message.senderId).queryKey,
        (data) => {
          const dataCopy = _.cloneDeep(data);
          const pages = findAndReplaceById(dataCopy.pages, message.id, message);
          return { pages, pageParams: [...data.pageParams] };
        }
      );
    });
  });

  const lastMessage = data?.pages[0]?.data[0];
  const handleOnClick = () => {
    unreadMessages.map((unreadMessage) => {
      socket.emit("messageRead", unreadMessage.id, (message) => {
        queryClient.setQueryData(
          chatOptions(message.senderId).queryKey,
          (data) => {
            const dataCopy = _.cloneDeep(data);
            const pages = findAndReplaceById(
              dataCopy.pages,
              message.id,
              message
            );
            return { pages, pageParams: [...data.pageParams] };
          }
        );
      });
    });

    onClick(user);
  };
  return (
    <Paper
      sx={{
        margin: 2,
        borderRadius: 5,
        bgcolor: !!selected ? "#d4d4d4" : "white",
      }}
      elevation={0}
    >
      <ListItemButton
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
        onClick={handleOnClick}
      >
        <Box>
          <Badge
            overlap="circular"
            badgeContent=""
            variant="dot"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: user?.isOnline ? "#2E8B57" : "gray",
                width: "14px",
                height: "14px",
                borderRadius: "14px",
                borderColor: "white",
                borderStyle: "solid",
                borderWidth: "2px",
              },
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={user?.picture ?? "/static/images/avatar/1.jpg"}
            />
          </Badge>
        </Box>
        <Box
          sx={{
            alignSelf: "flex-start",
            width: "65%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ height: "1.5rem", overflow: "hidden", fontWeight: 700 }}>
            {" "}
            {`${user.firstName} ${user.lastName}`}
          </Box>

          <Box
            sx={{
              height: "1.5rem",
              overflow: "hidden",
              fontWeight: unreadMessages?.length > 0 ? 500 : 0,
              color: unreadMessages?.length > 0 ? "black" : "gray",
              display: "flex",
              alignItems: "center",
            }}
          >
            {lastMessage?.delivered && lastMessage.receiverId == user.id && (
              <DoneAllIcon
                fontSize="medium"
                sx={{
                  color: lastMessage?.read ? "#1976d2" : "#999999",
                  paddingRight: 0.5,
                  paddingBottom: 0,
                  alignSelf: "flex-end",
                }}
              ></DoneAllIcon>
            )}{" "}
            {lastMessage?.content}
          </Box>
        </Box>
        <Box
          sx={{
            alignSelf: "flex-start",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ fontSize: ".9rem", minWidth: 65 }}>
            {lastMessage && formatUTCTo12Hour(lastMessage?.createdAt)}
          </Box>
          <Box>
            <Badge
              badgeContent={unreadMessages?.length}
              color="primary"
            ></Badge>
          </Box>
        </Box>
      </ListItemButton>
    </Paper>
  );
}
