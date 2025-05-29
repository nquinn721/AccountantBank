import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, List, ListItemText } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import type { IUser } from '../../store/User.store';
import { userStore } from '../../store/User.store';
import AddNewPlayer from '../AddNewPlayer.modal';
import PlayerInfoModal from './PlayerInfo.modal';
import PlayerListItem from './PlayerListItem';

const CurrentGame: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [currentPlayers, setCurrentPlayers] = React.useState<IUser[]>(
    userStore.currentPlayers,
  );
  const [currentPlayer, setCurrentPlayer] = React.useState<IUser | null>(null);

  useEffect(() => {
    setCurrentPlayers(userStore.currentPlayers);
    console.log('SETTING CURRENT PLAYERS');
  }, [userStore.currentPlayers]);

  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      sx={{ background: '#222', p: 3, borderRadius: 2 }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <ListItemText
          primary="Current Game"
          primaryTypographyProps={{ variant: 'h5', sx: { color: '#fff' } }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Button>
        <AddNewPlayer open={open} onClose={() => setOpen(false)} />
      </Box>
      <List>
        {currentPlayers?.map((player) => (
          <PlayerListItem
            onClick={() => {
              console.log('Player clicked:', player);
              setCurrentPlayer(player);
            }}
            key={player.id}
            player={player}
          />
        ))}
      </List>
      <PlayerInfoModal
        player={currentPlayer || ({} as IUser)}
        open={currentPlayer !== null}
        onClose={() => setCurrentPlayer(null)}
      />
    </Grid>
  );
};

export default observer(CurrentGame);
