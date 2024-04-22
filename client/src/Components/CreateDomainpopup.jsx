import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const CreateDomain = ({ onSubmit, onClose }) => {
  // State variables to manage form inputs
  const [domainName, setDomainName] = useState("");
  const [recordType, setRecordType] = useState("");
  const [recordValue, setRecordValue] = useState("");
  const [description, setDescription] = useState("");

  // Function to handle record type change
  const handleRecordTypeChange = (event) => {
    const selectedType = event.target.value;
    setRecordType(selectedType);
    // Set default record value based on selected type
    switch (selectedType) {
      case "A":
        setRecordValue("192.0.2.1");
        break;
      case "AAAA":
        setRecordValue("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
        break;
      // Add cases for other record types...
      default:
        setRecordValue("");
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const newDomain = {
      domainName,
      description
    };
    onSubmit(newDomain);
  };

  return (
    <Popover
      open={true} // Assuming this component is always open when called
      onClose={onClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 4 }}>
        {/* Close button */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* Title */}
        <Typography variant="h6" gutterBottom>
          Create Hosted Zone
        </Typography>
        {/* Domain Name input */}
        <Typography variant="body1" gutterBottom>
          Domain Name
        </Typography>
        <TextField
          fullWidth
          id="domain-name"
          className="mb-2"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
        />
        {/* Record Type select */}
        <Typography variant="body1" gutterBottom>
          Record Type
        </Typography>
        <Select
          value={recordType}
          onChange={handleRecordTypeChange}
          fullWidth
          id="record-type"
        >
          <MenuItem value="A">A (Address)</MenuItem>
          <MenuItem value="AAAA">AAAA (IPv6 Address)</MenuItem>
          {/* Add other record type options */}
        </Select>
        {/* Description input */}
        <Typography variant="body1" gutterBottom>
          Description
        </Typography>
        <TextField
          fullWidth
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Submit button */}
        <Button variant="contained" onClick={handleSubmit}>
          Create Hosted Zone
        </Button>
      </Box>
    </Popover>
  );
};

export default CreateDomain;
