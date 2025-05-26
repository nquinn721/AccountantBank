import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { userStore } from '../store/User.store';

const Dashboard: React.FC = () => {
  const [currentPlayers, setCurrentPlayers] = React.useState([]);

  useEffect(() => {
    const fetchCurrentPlayers = async () => {
      const players = await userStore.getCurrentPlayers();
      setCurrentPlayers(players);
    };

    fetchCurrentPlayers();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>
      <h2>Current Players</h2>
      <ul>
        {currentPlayers.map((player: any) => (
          <li key={player.id}>
            {player.name} (ID: {player.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(Dashboard);
