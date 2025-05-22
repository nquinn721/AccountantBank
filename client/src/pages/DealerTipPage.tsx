import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { tipStore } from '../store/Tip.store';
import PlayerSearch from '../components/forms/components/PlayerSearch';
import { observer } from 'mobx-react';
import { Box } from '@mui/material';
import BackButton from './components/BackButton';
import DealerTipIcon from '../components/sectionIcons/DealerTipIcon';
import PageHeader from './components/PageHeader';

const DealerTipPage: React.FC = () => {
  const [playerData, setPlayerData] = useState<{ [key: string]: number }>({});
  const [playerName, setPlayerName] = useState<string>('');

  const [dataSet, setDataSet] = useState<
    { date: string; player: number; total: number }[]
  >([]);

  const onPlayerFound = (playerName: string) => {
    const playerTipObject: { [key: string]: number } = {};
    const tts = tipStore.getPlayerTipsByDate(playerName);
    tts.dates.forEach((date, index) => {
      playerTipObject[date] = tts.amounts[index];
    });
    setPlayerData(playerTipObject);
    setPlayerName(playerName);
  };

  useEffect(() => {
    const allTips = tipStore.getAllTipAmounts();
    const allDates = tipStore.getAllTipDates();
    const data = allDates.map((date, index) => ({
      date,
      player: playerData[date] || 0,
      total: allTips[index],
    }));
    setDataSet(data);
  }, [playerData]);

  const series = [{ label: 'Total', area: true, dataKey: 'total' }];

  if (playerName)
    series.push({ label: playerName, area: true, dataKey: 'player' });
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <BackButton />
      <PageHeader
        title="Dealer Tips"
        className="dealer-tip-card"
        icon={<DealerTipIcon />}
      />
      <p>Choose a player to see historical Tips.</p>
      <PlayerSearch
        playerFound={onPlayerFound}
        onClear={() => setPlayerName('')}
      />
      <h2>All Player Tips</h2>
      <LineChart
        dataset={dataSet}
        xAxis={[
          {
            scaleType: 'point',
            label: 'Date',
            dataKey: 'date',
          },
        ]}
        series={series}
        height={200}
      />
    </Box>
  );
};

export default observer(DealerTipPage);
