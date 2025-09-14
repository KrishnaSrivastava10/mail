
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { API_URLS } from "../services/api.urls";
import useApi from "../hooks/useApi";
import { Box, Checkbox, List } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import Email from "./Email";
import NoMails from "../common/NoMails";
import { EMPTY_TABS } from "../constants/constant";

const Emails = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [refreshScreen, setRefreshScreen] = useState(false);

  const { openDrawer } = useOutletContext();
  const { type } = useParams();

  const getEmailsService = useApi(API_URLS.getEmailFromType);
  const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);
  const deleteEmailService = useApi(API_URLS.deleteEmail);

  useEffect(() => {
    getEmailsService.call({}, type);
  }, [type, refreshScreen]);

  // ✅ Select all toggle
  const selectAllEmails = (e) => {
    if (e.target.checked) {
      const emails = getEmailsService?.response?.map((email) => email._id);
      setSelectedEmails(emails);
    } else {
      setSelectedEmails([]);
    }
  };

  // ✅ Delete selected
  const deleteSelectedEmails = async () => {
    if (selectedEmails.length === 0) {
      alert("No emails selected");
      return;
    }

    try {
      if (type === "bin") {
        await deleteEmailService.call(selectedEmails);
      } else {
        await moveEmailsToBinService.call(selectedEmails);
      }

      // refresh inbox
      setRefreshScreen((prevState) => !prevState);
      setSelectedEmails([]); // clear selection
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  };

  return (
    <Box
      style={
        openDrawer
          ? { marginLeft: 250, width: "calc(100% - 250px)" }
          : { width: "100%" }
      }
    >
      <Box
        style={{
          padding: "20px 10px 0 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox
          size="small"
          checked={
            selectedEmails.length > 0 &&
            selectedEmails.length === getEmailsService?.response?.length
          }
          indeterminate={
            selectedEmails.length > 0 &&
            selectedEmails.length < getEmailsService?.response?.length
          }
          onChange={selectAllEmails}
        />
        <DeleteOutline onClick={deleteSelectedEmails} style={{ cursor: "pointer" }} />
      </Box>

      <List>
        {getEmailsService?.response?.map((email) => (
          <Email
            key={email._id}
            email={email}
            selectedEmails={selectedEmails}
            setSelectedEmails={setSelectedEmails}
            setRefreshScreen={setRefreshScreen}
          />
        ))}
      </List>

      {getEmailsService?.response?.length === 0 && (
        <NoMails message={EMPTY_TABS[type]} />
      )}
    </Box>
  );
};

export default Emails;
