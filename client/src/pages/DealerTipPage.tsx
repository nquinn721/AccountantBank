import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { dealerTipStore } from "../store/DealerTip.store";
import PlayerSearch from "../components/forms/components/PlayerSearch";
import { observer } from "mobx-react";
import moment from "moment";
import { Box, Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import BackButton from "./components/BackButton";

const DealerTipPage: React.FC = () => {
  const [tips, setTips] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  const [allTips, setAllTips] = useState<number[]>([]);
  const [allDates, setAllDates] = useState<string[]>([]);

  const onPlayerFound = (player: { id: number; name: string }) => {
    const tts = dealerTipStore.getPlayerTipsByDate(player.id);
    setTips(tts.amounts);
    setDates(tts.dates);
  };

  useEffect(() => {
    const allTips = dealerTipStore.getAllTips();
    const allDates = dealerTipStore.getAllDates();
    setAllTips(allTips);
    setAllDates(allDates);
  }, [dealerTipStore.dealerTips]);

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <BackButton />
      <h1>Dealer Tip</h1>
      <p>Choose a player to see historical Tips.</p>
      <PlayerSearch playerFound={onPlayerFound} />
      <h2>Player Tips</h2>
      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: dates,
            label: "Date",
          },
        ]}
        series={[{ data: tips, label: "Amount" }]}
      />
      <h2>All Player Tips</h2>
      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: allDates,
            label: "Date",
          },
        ]}
        series={[{ data: allTips, label: "Amount" }]}
      />
    </Box>
  );
};

export default observer(DealerTipPage);
