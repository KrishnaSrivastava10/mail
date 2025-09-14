
import {
  Box,
  Button,
  Dialog,
  InputBase,
  TextField,
  Typography,
  
} from "@mui/material";
import { styled } from "@mui/material/styles"; 

import { Close, DeleteOutline } from "@mui/icons-material";
import React, { useState } from "react";
import useApi from '../hooks/useApi';
import { API_URLS } from "../services/api.urls";

const dialogstyle = {
  height: "90%",
  width: "80%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: "10px 10px 0 0",
};

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  background: "#f2f6fc",
  "& > p": {
    fontSize: 14,
    fontWeight: 500,
  },
});

const RecipientsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0 15px",
  "& > div": {
    fontSize: 14,
    borderBottom: "1px solid #F5F5F5",
    marginTop: 10,
  },
});

const Footer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  alignItems: "center",
});

const SendButton = styled(Button)({
  background: "#0B57D0",
  color: "#fff",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: 18,
  width: 100,
});

const ComposeMail = ({ openDialog, setOpenDialog }) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const sentEmailService = useApi(API_URLS.saveSentEmail);
  const saveDraftService = useApi(API_URLS.saveDraftEmails);

  const closeComposeMail = async(e) => {
    e.preventDefault();
    const payload = {
        to,
        from: "krishna.testtechdev@gmail.com",
        subject: subject || "(No Subject)",
        body: body || "(No Content)",
        date: new Date(),
        image: "",
        name: "krishna.testtechdev@gmail.com",
        starred: false,
        type: "drafts",
      };

      await saveDraftService.call(payload);

      if (!saveDraftService.error) {
        setOpenDialog(false);
      }
  };


const sendMail = async (e) => {
  e.preventDefault();

  if (!to) {
    alert("Recipient email is required!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5001/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to,
        subject: subject || "(No Subject)",
        body: body || "(No Content)",
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // ✅ No need to call sentEmailService again
      setOpenDialog(false);

      alert("Email sent successfully!");
      setTo("");
      setSubject("");
      setBody("");
    } else {
      alert("Failed to send: " + (data.error || "Unknown error"));
    }
  } catch (err) {
    console.error("Error:", err);
    alert("⚠️ Something went wrong: " + err.message);
  }
};


  return (
    <Dialog open={openDialog} PaperProps={{ sx: dialogstyle }}>
      <Header>
        <Typography>New Message</Typography>
        <Close fontSize="small" onClick={closeComposeMail} />
      </Header>

      <RecipientsWrapper>
        <InputBase
          placeholder="Recipients"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <InputBase
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </RecipientsWrapper>

      <TextField
        multiline
        rows={22}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
      />

      <Footer>
        <SendButton onClick={sendMail}>Send</SendButton>
        <DeleteOutline onClick={() => setOpenDialog(false)} />
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
