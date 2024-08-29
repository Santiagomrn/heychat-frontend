import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import usersOptions from "../../context/queries/usersQuery";
import userChatsOptions from "../../context/queries/userChatsQuery";
export default function SearchUser({ searchText, setSearchText }) {
  const { refetch: refetchUsers } = useInfiniteQuery(
    userChatsOptions(searchText)
  );

  useEffect(() => {
    refetchUsers();
  }, [searchText]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "10px 8px",
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", md: "100%" },
          margin: { xs: 2, md: 2 },
          borderRadius: "17px",
        }}
        elevation={0}
      >
        <IconButton color="primary" sx={{ p: "10px" }}>
          <SearchIcon />
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Users..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </Paper>
    </Box>
  );
}
