import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { dealerTipStore } from "../store/DealerTip.store";
import PlayerSearch from "../components/forms/components/PlayerSearch";
import { observer } from "mobx-react";
import { Box } from "@mui/material";
import BackButton from "./components/BackButton";

const DealerTipPage: React.FC = () => {
  const [playerData, setPlayerData] = useState<{ [key: string]: number }>({});
  const [playerName, setPlayerName] = useState<string>("");

  const [dataSet, setDataSet] = useState<
    { date: string; player: number; total: number }[]
  >([]);

  const onPlayerFound = (player: { id: number; name: string }) => {
    const playerTipObject: { [key: string]: number } = {};
    const tts = dealerTipStore.getPlayerTipsByDate(player.id);
    tts.dates.forEach((date, index) => {
      playerTipObject[date] = tts.amounts[index];
    });
    setPlayerData(playerTipObject);
    setPlayerName(player.name);
  };

  useEffect(() => {
    const allTips = dealerTipStore.getAllTipAmounts();
    const allDates = dealerTipStore.getAllTipDates();
    const data = allDates.map((date, index) => ({
      date,
      player: playerData[date] || 0,
      total: allTips[index],
    }));
    setDataSet(data);
  }, [dealerTipStore.dealerTips, playerData]);

  const series = [{ label: "Total", area: true, dataKey: "total" }];

  if (playerName)
    series.push({ label: playerName, area: true, dataKey: "player" });
  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <BackButton />
      <h1>Dealer Tip</h1>
      <p>Choose a player to see historical Tips.</p>
      <PlayerSearch
        playerFound={onPlayerFound}
        onClear={() => setPlayerName("")}
      />
      <h2>All Player Tips</h2>
      <LineChart
        dataset={dataSet}
        xAxis={[
          {
            scaleType: "point",
            label: "Date",
            dataKey: "date",
          },
        ]}
        series={series}
        height={200}
      />
    </Box>
  );
};

export default observer(DealerTipPage);
