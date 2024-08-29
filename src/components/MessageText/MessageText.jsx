import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/material";
export default function MessageText({ text, onChange, onSubmit }) {
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSubmit(e);
    }
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Paper
        component="form"
        sx={{
          p: "10px 8px",
          display: "flex",
          alignItems: "center",
          width: { xs: "95%", md: "95%" },
          margin: { xs: 2, md: 5 },
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Message"
          value={text}
          onChange={onChange}
          onKeyDownCapture={handleKeypress}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} onClick={onSubmit}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
