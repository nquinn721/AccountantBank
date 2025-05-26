import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import PlayerSearch from '../components/forms/components/PlayerSearch';
import DealerTipIcon from '../components/sectionIcons/DealerTipIcon';
import tipStore from '../store/Tip.store';
import { IUser } from '../store/User.store';
import BackButton from './components/BackButton';
import PageHeader from './components/PageHeader';

const DealerTipPage: React.FC = () => {
  const [playerData, setPlayerData] = useState<{ [key: string]: number }>({});
  const [player, setPlayer] = useState<IUser | null>(null);

  const [dataSet, setDataSet] = useState<
    { date: string; player: number; total: number }[]
  >([]);

  const onPlayerFound = (player: IUser) => {
    const playerTipObject: { [key: string]: number } = {};
    const tts = tipStore.getPlayerTipsByDate(player.name);
    tts.dates.forEach((date, index) => {
      playerTipObject[date] = tts.amounts[index];
    });
    setPlayerData(playerTipObject);
    setPlayer(player);
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

  if (player)
    series.push({ label: player.name, area: true, dataKey: 'player' });
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
        onClear={() => setPlayer(null)}
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
