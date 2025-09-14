import { Star, StarBorder } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Box, Typography, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";

const Wrapper = styled(Box)({
  padding: "0 0 0 10px",
  background: "#f2f6fc",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "& > div": {
    display: "flex",
    width: "100%",
    "& > p": {
      fontSize: 14,
    },
  },
});

const Indicator = styled(Typography)({
  fontSize: "12px !important",
  background: "#ddd",
  color: "#222",
  padding: "0 4px",
  borderRadius: 4,
  marginRight: 6,
});

const DateText = styled(Typography)({
  marginLeft: "auto",
  marginRight: 20,
  fontSize: 12,
  color: "#5F6368",
});

const Email = ({ email, selectedEmails, setRefreshScreen, setSelectedEmails }) => {
  const navigate = useNavigate();
  const toggleStarredService = useApi(API_URLS.toggleStarredEmail);

  const toggleStarredMails = async () => {
    await toggleStarredService.call({ id: email._id, value: !email.starred });
    setRefreshScreen((prevState) => !prevState);
  };

  const onValueChange = () => {
    if (selectedEmails.includes(email._id)) {
      setSelectedEmails((prev) => prev.filter((id) => id !== email._id));
    } else {
      setSelectedEmails((prev) => [...prev, email._id]);
    }
  };

  return (
    <Wrapper>
      <Checkbox
        size="small"
        checked={selectedEmails.includes(email._id)}
        onChange={onValueChange}
      />

      {email.starred ? (
        <Star
          fontSize="small"
          style={{ marginRight: 10, color: "#FFF200", cursor: "pointer" }}
          onClick={toggleStarredMails}
        />
      ) : (
        <StarBorder
          fontSize="small"
          style={{ marginRight: 10, cursor: "pointer" }}
          onClick={toggleStarredMails}
        />
      )}

      <Box onClick={() => navigate(routes.view.path, { state: { email: email } })}>
        <Typography style={{ width: 200, overflow: "hidden" }}>{email.name}</Typography>
        <Indicator>Inbox</Indicator>
        <Typography>
          {email.subject}
          {email.body && " - "}
          {email.body}
        </Typography>
      </Box>

      <DateText>
        {new Date(email.date).toLocaleDateString("default", {
          day: "numeric",
          month: "long",
        })}
      </DateText>
    </Wrapper>
  );
};

export default Email;
