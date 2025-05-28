import { Box, Button, Grid, List, ListItemText } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { userStore } from '../../store/User.store';
import AddNewPlayer from '../AddNewPlayer';
import PlayerListItem from './PlayerListItem';

import type { IUser } from '../../store/User.store';

const CurrentGame: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [currentPlayers, setCurrentPlayers] = React.useState<IUser[]>(
    userStore.currentPlayers,
  );

  useEffect(() => {
    const fetchCurrentPlayers = async () => {
      const players = await userStore.getCurrentPlayers();
      setCurrentPlayers(userStore.currentPlayers);
    };

    fetchCurrentPlayers();
  }, [userStore.currentPlayers]);
  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      sx={{ background: '#222', p: 3, borderRadius: 2 }}
    >
      <ListItemText
        primary="Current Game"
        primaryTypographyProps={{ variant: 'h5', sx: { color: '#fff', mb: 2 } }}
      />
      <List>
        {currentPlayers.map((player) => (
          <PlayerListItem
            key={player.id}
            player={player}
            onClick={() =>
              console.log(`Clicked on ${player.name || player.id}`)
            }
          />
        ))}
      </List>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Add Player
        </Button>
        <AddNewPlayer open={open} onClose={() => setOpen(false)} />
      </Box>
    </Grid>
  );
};

export default observer(CurrentGame);
