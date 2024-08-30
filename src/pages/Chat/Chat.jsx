import { Box, Container, CssBaseline, Grid, Paper, Slide } from "@mui/material";
import MessageText from "../../components/MessageText/MessageText";
import { useEffect, useState } from "react";
import { socket } from "../../services/socket";
import Messages from "../../components/messages/Messages";
import UserChatList from "../../components/UserChatList/UserChatList";
import { queryClient } from "../../context/QueryClient";
import _ from "lodash";
import findAndReplaceById from "../../utils/findAndReplace";
import SearchUser from "../../components/SearchUser/SearchUser";
import userChatsOptions from "../../context/queries/userChatsQuery";
import chatOptions from "../../context/queries/chatQuery";
import ChatToolBar from "../../components/ChatToolBar/ChatToolBar";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chatWithUser, setChatWithUser] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    function connect() {
      socket.connect();
    }
    function disconnect() {
      socket.disconnect();
    }
    connect();
    return () => {
      disconnect();
    };
  }, []);

  function handleSubmitMessage(e) {
    e.preventDefault();
    socket.emit(
      "sendMessage",
      {
        content: message,
        receiverId: chatWithUser.id,
      },
      (message) => {
        queryClient.setQueryData(
          chatOptions(message?.receiverId).queryKey,
          (data) => {
            return {
              pages: [{ data: [message] }, ...data.pages],
              pageParams: [{ limit: 1, offset: 0 }, ...data.pageParams],
            };
          }
        );
        queryClient.refetchQueries(userChatsOptions(searchText));
      }
    );
    setMessage("");
  }

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh" }}
      style={{ overflow: "hidden" }}
    >
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: {
            xs: chatWithUser ? "none" : "block",
            md: "block",
          },
          background: "#f2f2f2",
          padding: { sx: 0, md: 2 },
        }}
      >
        <SearchUser
          searchText={searchText}
          setSearchText={setSearchText}
        ></SearchUser>
        <Box>
          <UserChatList
            chatWithUser={chatWithUser}
            searchText={searchText}
            onClickItem={(user) => {
              setChatWithUser(null);
              setTimeout(() => {
                setChatWithUser(user);
              }, 50);
            }}
          ></UserChatList>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={9}
        sx={{
          backgroundImage: 'url("/assets/chat-bg.png")',
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "left",
          padding: 2,
          display: { xs: chatWithUser ? "block" : "none", md: "block" },
        }}
      >
        {chatWithUser && (
          <>
            <Slide
              direction="left"
              in={!!chatWithUser}
              mountOnEnter
              unmountOnExit
            >
              <Container
                sx={{
                  padding: "0px !important",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "98vh",
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <ChatToolBar
                    chatWithUser={chatWithUser}
                    setChatWithUser={setChatWithUser}
                  ></ChatToolBar>
                </Box>

                <Box sx={{ flexGrow: 2, padding: 3 }}>
                  <Messages chatWithUser={chatWithUser}></Messages>
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                  <MessageText
                    text={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onSubmit={handleSubmitMessage}
                  ></MessageText>
                </Box>
              </Container>
            </Slide>
          </>
        )}
      </Grid>
    </Grid>
  );
}
