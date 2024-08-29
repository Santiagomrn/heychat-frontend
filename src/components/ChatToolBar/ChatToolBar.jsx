import { Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function ChatToolBar({ chatWithUser, setChatWithUser }) {
  return (
    <Toolbar style={{ justifyContent: "start", margin: 0, padding: 0 }}>
      <Box
        sx={{
          flexGrow: 0,
          marginRight: "1em",
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          color: "white",
        }}
      >
        <IconButton
          aria-label="arrowBackIcon"
          color="inherit"
          onClick={() => setChatWithUser(null)}
        >
          <ArrowBackIcon></ArrowBackIcon>
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 0, marginRight: "1em" }}>
        <Avatar
          alt="Remy Sharp"
          src={chatWithUser?.picture ?? "/static/images/avatar/1.jpg"}
        />
      </Box>
      <Typography
        variant="h5"
        component="h5"
        style={{ color: "white" }}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "flex" },
          color: "inherit",
        }}
      >
        {`${chatWithUser.firstName} ${chatWithUser.lastName}`}
      </Typography>
    </Toolbar>
  );
}
