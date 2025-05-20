import { ChevronLeft } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Button
        variant="text"
        sx={{ cursor: "pointer", padding: "8px 0px", color: "#426d4b" }}
        onClick={handleBack}
      >
        <ChevronLeft /> Back to Home
      </Button>
    </Box>
  );
};

export default BackButton;
