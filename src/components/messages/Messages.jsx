import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Paper, Stack, styled, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import formatUTCTo12Hour from "../../utils/timeFormater";
import chatOptions from "../../context/queries/chatQuery";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
import DoneAllIcon from "@mui/icons-material/DoneAll";
import _ from "lodash";

export default function Messages({ chatWithUser }) {
  const { data, fetchNextPage, hasNextPage, status, error } = useInfiniteQuery(
    chatOptions(chatWithUser?.id)
  );

  const messages = data?.pages?.reduce((acc, page) => {
    return [...acc, ...page.data];
  }, []);
  return (
    <InfiniteScroll
      dataLength={messages?.length ?? 0}
      next={() => fetchNextPage()}
      hasMore={hasNextPage}
      loading={<div style={{ color: "white" }}>Loading...</div>}
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        scrollbarColor: "#999999 #ffffff00",
      }}
      inverse={true}
      height={"70vh"}
    >
      {messages &&
        messages.map((message) => {
          return (
            <Stack
              spacing={1}
              sx={{
                padding: { xs: 1, md: 1 },
              }}
              key={message.id}
            >
              <Item
                sx={{
                  paddingLeft: 1.7,
                  paddingRight: 1.7,
                  paddingBottom: 0,
                  paddingTop: 0,
                  alignSelf:
                    message.receiverId == chatWithUser.id ? "end" : "start",
                  bgcolor:
                    message.receiverId == chatWithUser.id
                      ? "#13326D"
                      : "#2e4559",
                  color: "white",
                  display: "flex",
                  flexDirection: message.content.length > 20 ? "column" : "row",
                  borderRadius: "10px",
                  alignItems: "center",
                  maxWidth: "95%",
                }}
              >
                <Typography
                  maxWidth={"100%"}
                  component={"div"}
                  paddingBottom={message.content.length > 20 ? 0 : 0.7}
                  paddingTop={0.7}
                  sx={{
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    textAlign: "left",
                  }}
                >
                  {message.content}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignSelf: "flex-end",
                  }}
                >
                  <Typography
                    color={"#999999"}
                    fontSize={".7em"}
                    sx={{
                      alignSelf: "flex-end",
                      minWidth: 30,
                      paddingLeft: 1,
                      paddingBottom: 0.3,
                    }}
                  >
                    {formatUTCTo12Hour(message.createdAt)}
                  </Typography>
                  {message?.delivered &&
                    message.receiverId == chatWithUser.id && (
                      <DoneAllIcon
                        fontSize="medium"
                        sx={{
                          color: message?.read ? "#1976d2" : "#999999",
                          paddingLeft: 0.5,
                          paddingBottom: 0,
                          alignSelf: "flex-end",
                        }}
                      ></DoneAllIcon>
                    )}
                </Box>
              </Item>
            </Stack>
          );
        })}
    </InfiniteScroll>
  );
}
