import { Box } from "@mui/material";
import React from "react";
import BackButton from "./components/BackButton";

const CashOutPage: React.FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <BackButton />
      <h1>Cash Out</h1>
      {/* Add your cash out form or content here */}
    </Box>
  );
};

export default CashOutPage;
