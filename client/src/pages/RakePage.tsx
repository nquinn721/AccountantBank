import React, { use, useEffect, useState } from "react";
import BackButton from "./components/BackButton";
import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts-pro";
import { Rake, rakeStore } from "../store/Rake.store";

const RakePage: React.FC = () => {
  const [rakes, setRakes] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    setRakes(rakeStore.getAllRakes());
    setDates(rakeStore.getAllDates());
  }, [rakeStore.rakes]);
  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <BackButton />
      <h1>Rake Page</h1>
      <p>Welcome to the Rake Page.</p>
      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: dates,
            label: "Date",
          },
        ]}
        series={[{ data: rakes, label: "Amount" }]}
      />
    </Box>
  );
};

export default RakePage;
